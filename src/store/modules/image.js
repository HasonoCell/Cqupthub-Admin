import { defineStore } from "pinia"
import { ref } from "vue"

export const useImageStore = defineStore('image', () => {
    const imageBase = ref([])

    const getImageBase = () => {

    }

    return {
        images,
        getImage,
    }
}, { persist: true })