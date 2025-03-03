<script setup>
import ShowProject from "@/components/ShowProject/index.vue"
import ShowGame from "@/components/ShowGame/index.vue"
import { ref } from "vue";
const activeButton = ref("project");
const toggleTab = () => {
  activeButton.value === "project" ? "game" : "project";
};
</script>

<template>
  <el-radio-group
    v-model="activeButton"
    class="switch-button"
    @change="toggleTab"
  >
    <el-radio-button value="game">严肃游戏</el-radio-button>
    <el-radio-button value="project">实践项目</el-radio-button>
  </el-radio-group>

  <ShowProject :activeButton="activeButton"></ShowProject>
  <ShowGame :activeButton="activeButton"></ShowGame>
</template>

<style scoped lang="scss">
.switch-button {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}
</style>
