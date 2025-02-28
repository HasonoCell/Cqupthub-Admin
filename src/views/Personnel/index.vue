<script setup>
import DepartManage from "@/components/DepartManage/index.vue"
import JobRecruit from "@/components/JobRecruit/index.vue"
import { ref } from "vue";

const activeTab = ref("departManage"); // 当前选中的标签页

const toggleTab = () => {
  if (activeTab.value === 'departManage') {
    activeTab.value === 'jobRecruit'
  } else if (activeTab.value === 'jobRecruit') {
    activeTab.value === 'departManage'
  }
}
</script>

<template>
  <!-- 切换按钮 -->
  <el-tabs v-model="activeTab" type="card" class="switch-tabs" @click="toggleTab">
    <el-tab-pane label="部门管理" name="departManage"></el-tab-pane>
    <el-tab-pane label="岗位招聘" name="jobRecruit"></el-tab-pane>
  </el-tabs>

  <DepartManage :activeTab="activeTab"></DepartManage>
  <JobRecruit :activeTab="activeTab"></JobRecruit>
</template>



<style scoped>
/* 切换按钮样式 */
.switch-tabs {
  margin-bottom: 20px;
}
</style>