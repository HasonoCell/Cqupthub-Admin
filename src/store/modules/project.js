import { defineStore } from "pinia";
import { ref } from 'vue'
import { getProjectService } from "../../api/project";

export const useProjectStore = defineStore('project', () => {
    const projects = ref([])
    const error = ref(null)

    const getProject = async () => {
        try {
            error.value = null
            const { data } = await getProjectService()
            projects.value = data
        } catch (err) {
            error.value = err.message || '获取项目数据失败'
            ElMessage.error(err)
        }
    }

    return {
        projects,
        error,
        getProject
    }
}, { persist: true })