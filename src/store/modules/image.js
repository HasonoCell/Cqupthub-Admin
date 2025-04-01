import { defineStore } from "pinia"
import { ref } from "vue"
import { getImageService } from "../../api/image"

export const useImageStore = defineStore('image', () => {
    const imageBase = ref([])
    const error = ref(null)

    const getImageBase = async () => {
        try {
            error.value = null
            const { data } = await getImageService()
            imageBase.value = data
        } catch (err) {
            error.value = err.message || '获取图片数据失败'
            ElMessage.error(err)
        }
    }

    return {
        imageBase,
        error,
        getImageBase
    }
}, { persist: true })