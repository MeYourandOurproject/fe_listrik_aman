<template>
  <div class="container-fluid">
    <div class="container text-start">
      <form @submit.prevent>

        <!-- TITLE & AUTHOR -->
        <div class="row mt-3 mb-3">
          <div class="col-md-8">
            <label class="form-label">Judul</label>
            <input
              type="text"
              class="form-control"
              v-model="form.title"
              required
            />
          </div>

          <div class="col-md-4">
            <label class="form-label">Penulis</label>
            <input
              type="text"
              class="form-control"
              v-model="form.author"
              required
            />
          </div>
        </div>

        <!-- THUMBNAIL & CATEGORY -->
        <div class="row mt-3 mb-3">
          <div class="col-md-4">
            <label class="form-label">Preview Thumbnail</label>
            <div v-if="previewImage">
              <img :src="previewImage" class="img-thumbnail" />
            </div>
          </div>

          <div class="col-md-4">
            <label class="form-label">Thumbnail</label>
            <input
              ref="fileInput"
              type="file"
              class="form-control"
              accept="image/*"
              @change="handleFileChange"
            />
          </div>

          <div class="col-md-4">
            <label class="form-label">Category</label>
            <div class="dropdown">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
              >
                {{ selectedCategoryName || "Pilih Kategori" }}
              </button>

              <ul class="dropdown-menu">
                <li v-for="category in categories" :key="category.id">
                  <a
                    class="dropdown-item"
                    href="#"
                    @click.prevent="selectCategory(category)"
                  >
                    {{ category.name }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- CONTENT -->
        <div class="row mt-3 mb-3">
          <div class="col-md-12">
            <label class="form-label">Konten</label>
            <div ref="quillEditor" class="border"></div>
          </div>
        </div>

        <!-- STATUS BUTTON -->
        <div class="row mt-5 mb-5 pt-5">
          <div class="col-12 d-flex gap-3">

            <button
              type="button"
              class="btn btn-secondary"
              @click="handleSubmit('idea')"
            >
              Simpan sebagai Idea
            </button>

            <button
              type="button"
              class="btn btn-warning"
              @click="handleSubmit('draft')"
            >
              Simpan sebagai Draft
            </button>

            <button
              type="button"
              class="btn btn-success"
              @click="handleSubmit('publish')"
            >
              Publish Artikel
            </button>

          </div>
        </div>

      </form>
    </div>

    <!-- TOAST -->
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
      <div
        v-if="showToast"
        class="toast show align-items-center text-bg-success border-0"
        role="alert"
      >
        <div class="d-flex">
          <div class="toast-body">
            {{ toastMessage }}
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import Quill from "quill"
import "quill/dist/quill.snow.css"

const router = useRouter()
const route = useRoute()
const token = localStorage.getItem("token")
const API_BASE_URL = process.env.VUE_APP_API_BASE_URL

/* STATE */

const form = ref({
  title: "",
  author: "",
  content: "",
  category_id: null,
  thumbnail: null,
  status: "draft"
})

const articleData = ref({})
const categories = ref([])
const selectedCategoryName = ref(null)
const previewImage = ref(null)
const quillEditor = ref(null)
const fileInput = ref(null)

const showToast = ref(false)
const toastMessage = ref("")

/* FETCH ARTICLE */

const fetchArticle = async () => {
  const slug = route.params.slug

  const response = await fetch(
    `${API_BASE_URL}/api/artikels/admin/${slug}`,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  )

  const data = await response.json()
  articleData.value = data

  form.value.title = data.title
  form.value.author = data.author
  form.value.category_id = data.category_id

  previewImage.value = data.thumbnail

  if (quillEditor.value?.__quill) {
    quillEditor.value.__quill.clipboard.dangerouslyPasteHTML(
      data.content
    )
  }
}

/* FETCH CATEGORY */

const fetchCategory = async () => {
  const response = await fetch(`${API_BASE_URL}/api/categories`)
  const data = await response.json()
  categories.value = data

  const current = data.find(
    (c) => c.id === articleData.value.category_id
  )

  if (current) {
    selectedCategoryName.value = current.name
  }
}

/* SELECT CATEGORY */

const selectCategory = (category) => {
  form.value.category_id = category.id
  selectedCategoryName.value = category.name
}

/* HANDLE THUMBNAIL */

const handleFileChange = () => {
  const file = fileInput.value.files[0]
  if (!file) return

  form.value.thumbnail = file
  previewImage.value = URL.createObjectURL(file)
}

/* HANDLE SUBMIT */

const handleSubmit = async (statusValue) => {

  form.value.status = statusValue

  const editorInstance = quillEditor.value?.__quill
  form.value.content = editorInstance
    ? editorInstance.root.innerHTML
    : ""

  const formData = new FormData()
  formData.append("title", form.value.title)
  formData.append("author", form.value.author)
  formData.append("content", form.value.content)
  formData.append("category_id", form.value.category_id)
  formData.append("status", form.value.status)

  if (form.value.thumbnail) {
    formData.append("thumbnail", form.value.thumbnail)
  }

  const id = articleData.value.id

  const response = await fetch(
    `${API_BASE_URL}/api/artikels/admin/${id}`,
    {
      method: "PUT",
      body: formData,
      headers: { Authorization: `Bearer ${token}` }
    }
  )

  if (response.ok) {

    toastMessage.value = `Artikel berhasil disimpan sebagai ${statusValue.toUpperCase()}`
    showToast.value = true

    setTimeout(() => {
      showToast.value = false
      router.push("/admin/artikel")
    }, 1500)

  } else {
    alert("Update gagal")
  }
}

/* INIT */

onMounted(() => {
  const editor = new Quill(quillEditor.value, {
    theme: "snow"
  })
  quillEditor.value.__quill = editor

  fetchArticle()
  fetchCategory()
})
</script>

<style>
.ql-container {
  min-height: 200px;
}
.form-label {
  font-weight: bold;
}
</style>
