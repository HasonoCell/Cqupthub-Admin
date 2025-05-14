<script setup>
import PageCard from "@/components/PageCard/index.vue";
import { addImageService } from "../../api/image";
import { useImageStore } from "../../store";
import { ElMessage } from "element-plus";
import { computed, onMounted, ref } from "vue";

const imageStore = useImageStore();
const isSave = ref(false);
const scrollContainer = ref(null);
const allImage = computed(() => imageStore.allImage);

allImage.value.forEach((image) => {
  console.log("http://" + image.url);
});

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
      <el-button color="#000">更改</el-button>
    </div>
    <div class="display-image"></div>
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
                'selected-image': isSave,
                'cursor-mode': isSave,
              }"
            >
              <!-- <el-image :src="'http://' + image.url" /> -->
              <div class="image-placeholder"></div>
              <div class="delete-icon" /></div
          ></el-col>
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

.image-container {
  display: flex;
}

.image {
  width: 100%;
  height: 200px;
  margin-bottom: 20px;
  transition: transform 0.3s ease;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.08);

  &:hover {
    transform: scale(1.025);
  }

  &.cursor-mode {
    cursor: pointer;
  }

  &.selected-image {
    box-shadow: 0 2px 12px 0 rgb(60, 60, 60);
  }
}

.image-placeholder {
  width: 100%;
  height: 100%;
  background-color: #d9d9d9;
}
</style>
