import { defineStore } from "pinia";
import { ref } from "vue";
import { getGameService } from "../../api/game";

export const useGameStore = defineStore(
  "game",
  () => {
    const games = ref([]);
    const error = ref(null);

    const getGame = async () => {
      try {
        error.value = null;
        const { data } = await getGameService();
        games.value = data;
      } catch (err) {
        error.value = err.message || "获取项目数据失败";
        ElMessage.error(err);
      }
    };

    return {
      games,
      error,
      getGame,
    };
  },
  { persist: true }
);
