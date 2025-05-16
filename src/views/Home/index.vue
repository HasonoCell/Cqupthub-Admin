<script setup>
import PageCard from "@/components/PageCard/index.vue";
import {
  addImageService,
  deleteImageService,
  setHomePageService,
} from "../../api/image";
import { useImageStore } from "../../store";
import { ElMessage } from "element-plus";
import { computed, nextTick, onMounted, ref } from "vue";

const imageStore = useImageStore();
const isSave = ref(false);
const scrollContainer = ref(null);
const selectedImagesName = ref([]);

const allImage = computed(() => imageStore.allImage);
const displayedImages = computed(() => {
  return allImage.value.filter((image) => image.is_homepage === true);
});
const displayedImagesName = computed(() => {
  return displayedImages.value.map((image) => image.file_name);
});

const changeHomePage = async () => {
  if (isSave.value) {
    try {
      await setHomePageService(selectedImagesName.value);
      await imageStore.getAllImage();
      selectedImagesName.value = [];
      ElMessage.success("首页设置更新成功");
      await nextTick(() => {
        scrollContainer.value?.update();
      });
    } catch (error) {
      isSave.value = false;
      selectedImagesName.value = [];
      ElMessage.error("更新失败: " + error.message);
    }
  } else {
    selectedImagesName.value = [...displayedImagesName.value];
    isSave.value = true;
    ElMessage.warning("请选择要展示的图片");
  }
};

const selectImage = (imageName) => {
  if (!isSave.value) return;

  const selected = new Set(selectedImagesName.value);
  selected.has(imageName)
    ? selected.delete(imageName)
    : selected.add(imageName);
  selectedImagesName.value = Array.from(selected);
};

const deleteImage = async (imageName) => {
  try {
    await deleteImageService(imageName);
    await imageStore.getAllImage();
    ElMessage.success("删除成功");
  } catch (error) {
    ElMessage.error("删除失败: " + error.message);
  }
};

const handleImageUpload = async (file) => {
  const rawFile = file.raw;
  const previewURL = URL.createObjectURL(rawFile);
  const formData = new FormData();
  formData.append("image", rawFile);
  await addImageService(formData);
  await imageStore.getAllImage();
  ElMessage.success("上传成功");
};

onMounted(() => {
  imageStore.getAllImage();
});
</script>

<template>
  <div>
    <div class="header">
      <div>当前展示</div>
      <el-button color="#000" @click="changeHomePage">{{
        isSave ? "保存" : "更改"
      }}</el-button>
    </div>
    <div class="display-image">
      <el-scrollbar ref="scrollContainer">
        <el-row :gutter="30" class="image-container">
          <el-col
            v-for="image in displayedImages"
            :key="image.ID"
            :xs="24"
            :sm="12"
            :md="8"
            :lg="6"
            class="homepage-column"
          >
            <div class="image">
              <el-image v-if="image.url" :src="'http://' + image.url" />
              <div v-else class="image-placeholder"></div>
            </div>
          </el-col>
        </el-row>
      </el-scrollbar>
    </div>
  </div>

  <PageCard>
    <template #header>
      <div>图片库</div>
      <el-upload
        :auto-upload="false"
        :show-file-list="false"
        :on-change="handleImageUpload"
      >
        <el-button color="#000">上传</el-button>
      </el-upload>
    </template>
    <template #default>
      <div class="all-image">
        <el-row :gutter="30" class="image-container">
          <el-col
            v-for="image in allImage"
            :key="image.ID"
            :xs="24"
            :sm="12"
            :md="8"
            :lg="6"
            ><div
              class="image"
              :class="{
                'selected-image': selectedImagesName.includes(image.file_name),
                'cursor-mode': isSave,
              }"
              @click="selectImage(image.file_name)"
            >
              <el-image v-if="image.url" :src="'http://' + image.url" />
              <div v-else class="image-placeholder" />
              <el-icon class="delete-icon" @click="deleteImage(image.file_name)"
                ><Delete
              /></el-icon>
            </div>
          </el-col>
        </el-row>
      </div>
    </template>
  </PageCard>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #303133;
  font-weight: 600;
  padding: 0 20px;
  padding-bottom: 10px;
  box-sizing: border-box;
}

.display-image {
  margin: 0 20px;
  box-sizing: border-box;
  .image-container {
    display: flex;
    flex-wrap: nowrap;
  }
  margin-bottom: 20px;
}

.homepage-column {
  margin-bottom: 20px;
}

.image-container {
  display: flex;
}

.image {
  width: 100%;
  height: 200px;
  margin-bottom: 20px;
  transition: transform 0.3s ease;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.08);
  position: relative;

  &:hover {
    transform: scale(1.025);
  }

  &.cursor-mode {
    cursor: pointer;
  }

  &.selected-image {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);
  }
}

.image-placeholder {
  width: 100%;
  height: 100%;
  background-color: #d9d9d9;
}

.image:hover .delete-icon {
  opacity: 1;
  cursor: pointer;
}

.delete-icon {
  position: absolute;
  bottom: 40px;
  right: 0;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.3s ease;
  color: red;
  font-size: larger;
}
</style>
