import { defineStore } from "pinia"
import { ref } from "vue"
import { getImageService } from "../../api/image"

export const useImageStore = defineStore('image', () => {
    const imageBase = ref([])
    const loading = ref(false)
    const error = ref(null)

    const getImageBase = async () => {
        try {
            loading.value = true
            error.value = null
            const { data } = await getImageService()
            imageBase.value = data
        } catch (err) {
            error.value = err.message || '获取图片数据失败'
            ElMessage.error(err)
        } finally {
            loading.value = false
        }
    }

    return {
        imageBase,
        loading,
        error,
        getImageBase
    }
}, { persist: true })