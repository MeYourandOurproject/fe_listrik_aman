<template>
  <div class="container">

    <!-- BUTTON TAMBAH -->
    <div class="row justify-content-start mb-3">
      <div class="col-3">
        <button @click="toggleUpload" class="btn btn-success">
          <i class="bi bi-plus"></i> TAMBAH ARTIKEL
        </button>
      </div>
    </div>

    <!-- UPLOAD WORD FORM -->
    <div v-if="showUpload" class="card p-3 mb-4 shadow-sm">
      <div class="row align-items-end">
        <div class="col-md-6">
          <label class="form-label">Upload Word (.docx)</label>
          <input
            ref="wordInput"
            type="file"
            class="form-control"
            accept=".docx"
          />
        </div>

        <div class="col-md-3">
          <button @click="handleUploadWord" class="btn btn-success w-100">
            Upload
          </button>
        </div>

        <div class="col-md-3">
          <button @click="showUpload = false" class="btn btn-secondary w-100">
            Batal
          </button>
        </div>
      </div>
    </div>

    <!-- ALERT -->
    <div class="row justify-content-center">
      <div class="col-lg-6">
        <transition name="fade">
          <div v-if="showSuccessAlert" class="alert alert-success">
            Artikel berhasil ditambahkan
          </div>
        </transition>

        <transition name="fade">
          <div v-if="showErrorAlert" class="alert alert-danger">
            Upload gagal
          </div>
        </transition>
      </div>
    </div>

    <!-- TABLE -->
    <table class="table table-striped table-hover">
      <thead class="text-center">
        <tr>
          <th>No</th>
          <th>Title</th>
          <th>Author</th>
          <th @click="toggleSortOrder" style="cursor:pointer">
            Created At
            <i :class="sortOrder === 'desc' ? 'bi bi-arrow-down' : 'bi bi-arrow-up'"></i>
          </th>
          <th>Action</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, index) in paginatedData" :key="item.id">
          <td>{{ index + 1 + (currentPage - 1) * itemsPerPage }}</td>
          <td class="text-start">{{ item.title }}</td>
          <td>{{ item.author }}</td>
          <td>{{ formatDate(item.createdAt) }}</td>

          <td>
            <div class="d-flex justify-content-center gap-2">
              <a :href="`/admin/artikel/read/${item.slug}`" class="btn btn-info btn-sm">
                <i class="bi bi-eye"></i>
              </a>

              <router-link :to="`/admin/artikel/edit/${item.slug}`">
                <button class="btn btn-warning btn-sm">
                  <i class="bi bi-pencil"></i>
                </button>
              </router-link>

              <button @click="deleteData(item.id)" class="btn btn-danger btn-sm">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </td>

          <td>
            <span class="badge text-uppercase" :class="getStatusClass(item.status)">
              {{ item.status }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";

export default {
  setup() {
    const datas = ref([]);
    const currentPage = ref(1);
    const itemsPerPage = ref(10);
    const sortOrder = ref("desc");

    const showUpload = ref(false);
    const showSuccessAlert = ref(false);
    const showErrorAlert = ref(false);

    const wordInput = ref(null);

    const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;
    const token = localStorage.getItem("token");

    /* ================= FETCH ================= */
    const fetchData = async () => {
      const res = await fetch(`${API_BASE_URL}/api/artikels/admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await res.json();
      datas.value = result.data;
    };

    /* ================= TOGGLE ================= */
    const toggleUpload = () => {
      showUpload.value = !showUpload.value;
    };

    /* ================= UPLOAD WORD ================= */
    const handleUploadWord = async () => {
      const file = wordInput.value.files[0];
      if (!file) return alert("Pilih file dulu!");

      const formData = new FormData();
      formData.append("file_word", file);

      try {
        const res = await fetch(
          `${API_BASE_URL}/api/artikels/admin/import-word`,
          {
            method: "POST",
            body: formData,
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) throw new Error("Upload gagal");

        showSuccessAlert.value = true;
        showErrorAlert.value = false;

        setTimeout(() => {
          showSuccessAlert.value = false;
          showUpload.value = false;
          fetchData();
        }, 1500);

      } catch (err) {
        showErrorAlert.value = true;
      }
    };

    /* ================= DELETE ================= */
    const deleteData = async (id) => {
      if (!confirm("Hapus artikel ini?")) return;

      await fetch(`${API_BASE_URL}/api/artikels/admin/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchData();
    };

    /* ================= SORT ================= */
    const sortedData = computed(() => {
      return [...datas.value].sort((a, b) =>
        sortOrder.value === "asc"
          ? new Date(a.createdAt) - new Date(b.createdAt)
          : new Date(b.createdAt) - new Date(a.createdAt)
      );
    });

    const paginatedData = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      return sortedData.value.slice(start, start + itemsPerPage.value);
    });

    const toggleSortOrder = () => {
      sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
    };

    /* ================= UTIL ================= */
    const formatDate = (date) => {
      return new Date(date).toLocaleString("id-ID");
    };

    const getStatusClass = (status) => {
      if (status === "idea") return "bg-primary px-3 py-1";
      if (status === "draft") return "bg-warning px-3 py-1";
      if (status === "publish") return "bg-success px-3 py-1";
      return "bg-secondary";
    };

    onMounted(fetchData);

    return {
      datas,
      paginatedData,
      currentPage,
      itemsPerPage,
      sortOrder,
      toggleSortOrder,
      formatDate,
      deleteData,
      getStatusClass,

      showUpload,
      toggleUpload,
      handleUploadWord,
      wordInput,

      showSuccessAlert,
      showErrorAlert,
    };
  },
};
</script>