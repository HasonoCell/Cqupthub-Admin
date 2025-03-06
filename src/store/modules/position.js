import { defineStore } from "pinia"
import { ref } from "vue"
import { ElMessage } from "element-plus"
import { getPositionService } from "../../api/position"

export const usePositionStore = defineStore('position', () => {
    // 状态定义
    const positions = ref([])
    const loading = ref(false)
    const error = ref(null)

    const getPosition = async () => {
        try {
            loading.value = true
            error.value = null
            const { data } = await getPositionService()
            positions.value = data
        } catch (err) {
            error.value = err.message || '获取岗位数据失败'
            ElMessage.error(err)
        } finally {
            loading.value = false
        }
    }

    return {
        positions,
        loading,
        error,
        getPosition
    }
}, { persist: true })