<template>
  <div class="container-fluid">
    <div class="container text-start">
      <form @submit.prevent="handleSubmit">
        <div class="row mt-3 mb-3">
          <div class="col-md-8">
            <label class="form-label">Judul</label>
            <input
              type="text"
              class="form-control"
              v-model="form.title"
              :placeholder="articleData.title"
              required
            />
          </div>
          <div class="col-md-4">
            <label class="form-label">Penulis</label>
            <input
              type="text"
              class="form-control"
              v-model="form.author"
              :placeholder="articleData.author"
              required
            />
          </div>
        </div>

        <div class="row mt-3 mb-3">
          <div class="col-md-4">
            <label class="form-label">Preview Thumbnail</label>
            <div v-for="(img, index) in previewImages" :key="index">
              <img :src="img" class="img-thumbnail" />
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
              <button class="btn btn-secondary dropdown-toggle text-center" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {{ selectedCategoryName || "Pilih Kategori" }}
              </button>
              <ul class="dropdown-menu">
                <li v-for="(category, index) in categories" :key="index">
                  <a 
                    class="dropdown-item" 
                    href="#" 
                    @click.prevent="selectCategory(category)"
                  >
                    {{category.name}}
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
                <div class="fw-bold">Article Has Been Created Successfully</div>
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
import { useRoute, useRouter } from "vue-router";

const showSuccessAlert = ref(false);
const showErrorAlert = ref(false);

const router = useRouter();
const route = useRoute();

const form = ref({
  title: "",
  author: "",
  content: "",
  thumbnail: null,
});

const token = localStorage.getItem("token");

const fileInput = ref(null);
const imageInput = ref(null);
const previewImages = ref([]);
const quillEditor = ref(null);
const files = ref([]);
const loading = ref(false);

const categories =  ref([]);
const selectedCategoryName = ref(null);

const articleData = ref({
  title: "",
  author: "",
  content: "",
  thumbnail: "",
});

const API_BASE_URL= process.env.VUE_APP_API_BASE_URL;

// 🟢 Fetch data artikel by slug
const fetchArticle = async () => {
  loading.value = true;
  try {
    const slug = route.params.slug;
    const response = await fetch(
      `${API_BASE_URL}/api/artikels/${slug}`
    );
    if (!response.ok) throw new Error("Failed to fetch data");

    const data = await response.json();
    articleData.value = data;

    // Isi form dengan data artikel
    form.value.title = data.title;
    form.value.author = data.author;

    if (quillEditor.value?.__quill) {
      quillEditor.value.__quill.clipboard.dangerouslyPasteHTML(data.content);
    }

    // Tampilkan thumbnail lama jika ada
    if (data.thumbnail) {
      previewImages.value = [data.thumbnail];
    }
  } catch (error) {
    console.error("Error fetching article:", error);
  } finally {
    loading.value = false;
  }
};

const fetchCategory = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/categories`);
    if (!response.ok) throw new Error("Gagal memuat kategori");

    const data = await response.json();
    categories.value = data;

    // Jika artikel sudah memiliki kategori, tampilkan nama kategorinya
    if (articleData.value.category_id) {
      const currentCategory = data.find(
        (cat) => cat.id === articleData.value.category_id
      );
      if (currentCategory) selectedCategoryName.value = currentCategory.name;
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

const selectCategory = (category) => {
  form.value.category_id = category.id;
  selectedCategoryName.value = category.name;
};

// 🟢 Handle perubahan file thumbnail
const handleFileChange = () => {
  const inputFiles = fileInput.value.files;
  previewImages.value = Array.from(inputFiles).map((file) =>
    URL.createObjectURL(file)
  );
  if (inputFiles.length > 0) {
    form.value.thumbnail = inputFiles[0];
  }
  files.value = [...files.value, ...inputFiles];
};

// 🟢 Fungsi untuk memasukkan gambar ke konten Quill
const insertImage = async () => {
  const editorInstance = quillEditor.value?.__quill;
  const file = imageInput.value.files[0];

  // const API_BASE_URL= process.env.VUE_APP_API_BASE_URL;

  if (file && editorInstance) {
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        const imageUrl = data.url;

        const range = editorInstance.getSelection();
        editorInstance.insertEmbed(range.index, "image", imageUrl);
        files.value = [...files.value, file];
      } else {
        console.error("Gagal mengunggah gambar.");
        alert("Gagal mengunggah gambar.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan saat mengunggah gambar.");
    } finally {
      imageInput.value.value = null;
    }
  }
};

// 🟢 Fungsi untuk menghapus gambar dari Quill Editor
const deleteImage = (imageNode) => {
  const editorInstance = quillEditor.value?.__quill;
  if (editorInstance && imageNode) {
    const index = editorInstance.getIndex(Quill.find(imageNode));
    editorInstance.deleteText(index, 1);
  }
};

// 🟢 Tambahkan event listener untuk gambar yang diklik
const handleImageClick = (event) => {
  if (event.target.tagName === "IMG") {
    const confirmed = confirm("Hapus gambar ini?");
    if (confirmed) {
      deleteImage(event.target);
    }
  }
};

// 🟢 Handle submit form
const handleSubmit = async () => {
  const id = articleData.value.id;

  const editorInstance = quillEditor.value?.__quill;
  form.value.content = editorInstance ? editorInstance.root.innerHTML : "";

  const formData = new FormData();
  formData.append("title", form.value.title);
  formData.append("author", form.value.author);
  formData.append("content", form.value.content);
  formData.append("category_id", form.value.category_id);

  // Upload thumbnail jika ada
  // if (form.value.thumbnail) {
  //   formData.append("thumbnail", form.value.thumbnail);
  // }

  files.value.forEach((file) => {
    formData.append("picture", file);
  });

  // for (let pair of formData.entries()) {
  //   console.log(pair[0] + ": " + pair[1]);
  // }

  // console.log(token)

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/artikels/${id}`,
      {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // const result = await response.json();
    // console.log("Response from server:", result);

    if (response.ok) {
      showSuccessAlert.value = true;
      showErrorAlert.value = false;
      setTimeout(() => router.push("/admin/artikel"), 3000);
    } else {
      showErrorAlert.value = true;
      setTimeout(() => (showErrorAlert.value = false), 2000);
    }
  } catch (error) {
    console.error(error);
    alert("Terjadi kesalahan saat membuat artikel.");
  }
};

onMounted(async () => {
  // 1️⃣ Buat Quill editor dulu
  const editor = new Quill(quillEditor.value, {
    theme: "snow",
    placeholder: "Tulis konten artikel di sini...",
  });
  quillEditor.value.__quill = editor;

  // Tambah listener hapus gambar
  quillEditor.value.addEventListener("click", handleImageClick);

  // 2️⃣ Setelah editor siap, baru ambil data artikel
  await fetchArticle();

  // 3️⃣ Isi editor dengan konten dari artikel
  if (articleData.value.content) {
    editor.clipboard.dangerouslyPasteHTML(articleData.value.content);
  }

  // 4️⃣ Ambil data kategori
  await fetchCategory();
});
</script>

<style>
.ql-container {
  min-height: 100px;
}
.addimagetocontent {
  padding-top: 100px;
}
</style>
