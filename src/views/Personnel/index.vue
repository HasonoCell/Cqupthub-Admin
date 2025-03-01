<script setup>
import DepartManage from "@/components/DepartManage/index.vue";
import JobRecruit from "@/components/JobRecruit/index.vue";
import { ref } from "vue";
const activeButton = ref("departManage");
const toggleTab = () => {
  activeButton.value === "departManage" ? "jobRecruit" : "departManage";
};
</script>

<template>
  <el-radio-group
    v-model="activeButton"
    class="switch-button"
    @change="toggleTab"
  >
    <el-radio-button value="departManage">部门管理</el-radio-button>
    <el-radio-button value="jobRecruit">岗位招聘</el-radio-button>
  </el-radio-group>

  <DepartManage :activeButton="activeButton"></DepartManage>
  <JobRecruit :activeButton="activeButton"></JobRecruit>
</template>

<style scoped lang="scss">
.switch-button {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}
</style>
