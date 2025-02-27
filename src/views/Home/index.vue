<script setup>
import PageCard from "@/components/PageCard/index.vue";
import { ref } from "vue";
const imageUrl = ref(null);
const upload = ref(null);

const triggerUpload = () => {
  upload.value.submit();
};

const handleFileChange = (file) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    imageUrl.value = e.target?.result;
  };
  reader.readAsDataURL(file.raw);
};
</script>

<template>
  <PageCard>
    <template #header>首页设置</template>
    <template #default>
      <div class="upload-container">
        <!-- 图片上传功能 -->
        <span class="upload-title">背景图片上传</span>

        <div class="upload-content">
          <div class="image-preview">
            <img v-if="imageUrl" :src="imageUrl" alt="Uploaded Image" />
            <div v-else class="placeholder">暂无图片</div>
          </div>
          <el-upload
            ref="upload"
            action="#"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="handleFileChange"
          >
            <el-button color="#000" @click="triggerUpload">上传图片</el-button>
          </el-upload>
        </div>
      </div>
      <div class="photo-wall"><!-- 滚动照片墙 --></div>
    </template>
    <template #footer>
      <el-button color="#000">保存设置</el-button>
    </template>
  </PageCard>
</template>

<style scoped lang="scss">
.upload-container {
  display: flex;
  flex-direction: column;
}

.upload-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}

.upload-content {
  display: flex;
  align-items: center;
}

.image-preview {
  width: 200px;
  height: 150px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.placeholder {
  font-size: 14px;
  color: #999;
}

.el-button {
  margin-left: 20px;
  background-color: black;
  color: white;
  border: none;
}

.photo-wall {
  width: 100%;
  height: 200px;
  background-color: aqua;
  margin-top: 20px;
}
</style>
