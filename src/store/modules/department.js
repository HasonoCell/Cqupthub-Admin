import { defineStore } from "pinia"
import { ref } from "vue"

export const useDepartmentStore = defineStore('department', () => {
    const department = ref([])

    const getDepart = () => {

    }

    return {
        department,
        getDepart,
    }
}, { persist: true })