import { defineStore } from "pinia";
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { getPositionService } from "../../api/position";

export const usePositionStore = defineStore(
  "position",
  () => {
    const positions = ref([]);
    const error = ref(null);

    const getPosition = async () => {
      try {
        error.value = null;
        const { data } = await getPositionService();
        positions.value = data;
      } catch (err) {
        error.value = err.message || "获取岗位数据失败";
        ElMessage.error(err);
      }
    };

    return {
      positions,
      error,
      getPosition,
    };
  },
  { persist: true }
);
