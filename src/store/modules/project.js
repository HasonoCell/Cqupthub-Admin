import { defineStore } from "pinia";
import { ref } from 'vue'
import { getProjectService } from "../../api/project";

export const useProjectStore = defineStore('project', () => {
    // 状态定义
    const projects = ref([])
    const loading = ref(false)
    const error = ref(null)

    const getProject = async () => {
        try {
            loading.value = true
            error.value = null
            const { data } = await getProjectService()
            projects.value = data
        } catch (err) {
            error.value = err.message || '获取项目数据失败'
            ElMessage.error(err)
        } finally {
            loading.value = false
        }
    }

    return {
        projects,
        loading,
        error,
        getProject
    }
}, { persist: true })