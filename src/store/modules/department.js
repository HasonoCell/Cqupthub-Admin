import { defineStore } from "pinia";
import { ref } from "vue";
import { getDepartmentService } from "../../api/department";
import { ElMessage } from "element-plus";

export const useDepartmentStore = defineStore(
  "department",
  () => {
    const departments = ref([]);
    const error = ref(null);

    const getDepart = async () => {
      try {
        error.value = null;
        const { data } = await getDepartmentService();
        departments.value = data;
      } catch (err) {
        error.value = err.message || "获取部门数据失败";
        ElMessage.error(err);
      }
    };

    return {
      departments,
      error,
      getDepart,
    };
  },
  { persist: true }
);
