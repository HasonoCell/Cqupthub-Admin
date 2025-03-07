import { defineStore } from "pinia";
import { ref } from "vue";
import { getGameService } from "../../api/game";

export const useGameStore = defineStore('game', () => {
    const games = ref([])
    const error = ref(null)
    const loading = ref(false)

    const getGames = async () => {
        try {
            loading.value = true
            error.value = null
            const { data } = await getGameService()
            games.value = data
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
        getGames
    }
}, { persist: true })