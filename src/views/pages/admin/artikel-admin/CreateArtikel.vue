<template>
  <div class="container-fluid">
    <div class="container text-start">
      <form @submit.prevent="handleSubmit">
        <div class="row mt-3 mb-3">
          <div class="col-md-8">
            <label class="form-label">Judul</label>
            <input
              v-model="form.title"
              type="text"
              class="form-control"
              placeholder="Masukkan judul artikel"
              required
            />
          </div>
          
          <div class="col-md-4">
            <label class="form-label">Penulis</label>
            <input
              v-model="form.author"
              type="text"
              class="form-control"
              placeholder="Masukkan nama penulis"
              required
            />
          </div>
        </div>

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
              ref="thumbnailInput"
              type="file"
              class="form-control"
              accept="image/*"
              @change="handleThumbnailChange"
            />
          </div>
          <div class="col-md-4">
            <label class="form-label">Category</label>
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle text-center" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {{ selectedCategoryName || "Pilih Kategori" }}
              </button>
              <ul class="dropdown-menu w-100">
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
        <div class="row mt-3 mb-3">
          <div class="col-md-12">
            <label class="form-label">Konten</label>
            <div ref="quillEditor" class="border"></div>
          </div>
          <div class="col-md-12 addimagetocontent">
            <label class="form-label">Tambahkan Gambar ke Konten</label>
            <input
              ref="imageInput"
              type="file"
              class="form-control"
              accept="image/*"
              @change="insertImage"
            />
          </div>
        </div>
        <div class="row mt-3 mb-3">
          <div class="col-3">
            <button
              type="submit"
              class="btn btn-success btn-lg ps-5 pe-5 pt-3 pb-3"
            >
              Simpan Artikel
            </button>
          </div>
          <div class="col-9">
            <!-- Success Alert -->
            <transition name="fade">
              <div
                v-if="showSuccessAlert"
                class="alert alert-success d-flex align-items-center"
                role="alert"
              >
                <i class="bi bi-check-circle-fill me-3"></i>
                <div class="fw-bold">Article Has Been Create Successfully</div>
              </div>
            </transition>

            <!-- Error Alert -->
            <transition name="fade">
              <div
                v-if="showErrorAlert"
                class="alert alert-danger d-flex align-items-center"
                role="alert"
              >
                <i class="bi bi-x-circle-fill me-3"></i>
                <div class="fw-bold">
                  Create Article failed! Please check the form.
                </div>
              </div>
            </transition>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useRouter } from "vue-router";

const router = useRouter();
const token = localStorage.getItem("token");
const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;

const form = ref({
  title: "",
  author: "",
  content: "",
  category_id: null,
});

const categories = ref([]);
const selectedCategoryName = ref(null);

const previewImage = ref(null);
const thumbnailFile = ref(null);
const contentImages = ref([]);

const quillEditor = ref(null);
const imageInput = ref(null);
const thumbnailInput = ref(null);

const showSuccessAlert = ref(false);
const showErrorAlert = ref(false);

/* =========================
   CATEGORY
========================= */

const fetchCategory = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/categories/admin`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    categories.value = data;
  } catch (error) {
    console.error(error);
  }
};

const selectCategory = (category) => {
  form.value.category_id = category.id;
  selectedCategoryName.value = category.name;
};

/* =========================
   THUMBNAIL
========================= */

const handleThumbnailChange = () => {
  const file = thumbnailInput.value.files[0];
  if (!file) return;

  thumbnailFile.value = file;
  previewImage.value = URL.createObjectURL(file);
};

/* =========================
   INSERT IMAGE TO QUILL
========================= */

const insertImage = async () => {
  const file = imageInput.value.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch(`${API_BASE_URL}/api/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    const imageUrl = data.url;

    const editor = quillEditor.value.__quill;
    const range = editor.getSelection(true);
    editor.insertEmbed(range.index, "image", imageUrl);

    contentImages.value.push(file);

  } catch (error) {
    console.error(error);
  } finally {
    imageInput.value.value = null;
  }
};

/* =========================
   SUBMIT
========================= */

const handleSubmit = async () => {
  const editor = quillEditor.value.__quill;
  form.value.content = editor.root.innerHTML;

  const formData = new FormData();
  formData.append("title", form.value.title);
  formData.append("author", form.value.author);
  formData.append("content", form.value.content);
  formData.append("category_id", form.value.category_id);

  if (thumbnailFile.value) {
    formData.append("thumbnail", thumbnailFile.value);
  }

  contentImages.value.forEach((file) => {
    formData.append("picture", file);
  });

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/artikels/admin`,
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      showSuccessAlert.value = true;
      showErrorAlert.value = false;

      setTimeout(() => {
        router.push("/admin/artikel");
      }, 2000);
    } else {
      showSuccessAlert.value = false;
      showErrorAlert.value = true;
    }
  } catch (error) {
    console.error(error);
    showErrorAlert.value = true;
  }
};

/* =========================
   MOUNT
========================= */

onMounted(() => {
  fetchCategory();

  const editor = new Quill(quillEditor.value, {
    theme: "snow",
    placeholder: "Tulis konten artikel di sini...",
  });

  quillEditor.value.__quill = editor;
});
</script>

<style>
.ql-container {
  min-height: 200px;
}

.form-label {
  font-weight: bold;
}
</style>
