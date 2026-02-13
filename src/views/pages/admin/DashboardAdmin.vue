<template>
  <div class="dashboard-admin container-fluid p-4">

    <h3 class="fw-bold mb-4">Dashboard Overview</h3>

    <!-- STAT CARDS -->
    <div class="row g-4">

      <div class="col-md-3">
        <div class="card shadow-sm border-0 stat-card">
          <div class="card-body">
            <h6>Total Artikel</h6>
            <h2>{{ stats.totalArtikel }}</h2>
          </div>
        </div>
      </div>

      <div class="col-md-3">
        <div class="card shadow-sm border-0 stat-card">
          <div class="card-body">
            <h6>Total Category</h6>
            <h2>{{ stats.totalCategory }}</h2>
          </div>
        </div>
      </div>

      <div class="col-md-3">
        <div class="card shadow-sm border-0 stat-card">
          <div class="card-body">
            <h6>Total Views</h6>
            <h2>{{ stats.totalViews }}</h2>
          </div>
        </div>
      </div>

      <div class="col-md-3">
        <div class="card shadow-sm border-0 stat-card">
          <div class="card-body">
            <h6>Total Publish</h6>
            <h2>{{ stats.totalPublish }}</h2>
          </div>
        </div>
      </div>

    </div>

    <!-- CHART & POPULAR -->
    <div class="row mt-5">

      <!-- Views Chart -->
      <div class="col-md-8">
        <div class="card shadow-sm border-0 p-3">
          <h6 class="fw-bold mb-3">Views Per Hari</h6>
          <canvas ref="chartCanvas"></canvas>
        </div>
      </div>

      <!-- Artikel Terpopuler -->
      <div class="col-md-4">
        <div class="card shadow-sm border-0 p-3">
          <h6 class="fw-bold mb-3">Artikel Terpopuler</h6>
          <ul class="list-group list-group-flush">
            <li
              v-for="item in popularArticles"
              :key="item.id"
              class="list-group-item d-flex justify-content-between"
            >
              {{ item.title }}
              <span class="badge bg-primary">
                {{ item.views }} views
              </span>
            </li>
          </ul>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import Chart from "chart.js/auto"

const API_BASE_URL = process.env.VUE_APP_API_BASE_URL
const token = localStorage.getItem("token")

const stats = ref({
  totalArtikel: 0,
  totalCategory: 0,
  totalViews: 0,
  totalPublish: 0
})

const popularArticles = ref([])
const chartCanvas = ref(null)

/* FETCH DASHBOARD DATA */
const fetchDashboard = async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/dashboard/admin`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )

    const data = await response.json()

    stats.value = data.stats
    popularArticles.value = data.popular
    renderChart(data.chart)

  } catch (error) {
    console.error(error)
  }
}

/* RENDER CHART */
const renderChart = (chartData) => {

  new Chart(chartCanvas.value, {
    type: "line",
    data: {
      labels: chartData.labels,
      datasets: [{
        label: "Views",
        data: chartData.data,
        borderColor: "#0d6efd",
        backgroundColor: "rgba(13,110,253,0.1)",
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      }
    }
  })
}

onMounted(() => {
  fetchDashboard()
})
</script>

<style>
.dashboard-admin {
  background-color: #f8f9fa;
  min-height: 100vh;
}

.stat-card h6 {
  color: #6c757d;
}

.stat-card h2 {
  font-weight: bold;
}
</style>
