import { defineStore } from "pinia";
import { ref } from "vue";
import { getImageService } from "../../api/image";

export const useImageStore = defineStore(
  "image",
  () => {
    const allImage = ref([]);
    const error = ref(null);

    const getAllImage = async () => {
      try {
        error.value = null;
        const { data } = await getImageService();
        allImage.value = data;
      } catch (err) {
        error.value = err.message || "获取图片数据失败";
        ElMessage.error(err);
      }
    };

    return {
      allImage,
      error,
      getAllImage,
    };
  },
  { persist: true }
);
