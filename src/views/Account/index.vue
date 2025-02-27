<script setup>
import PageCard from '@/components/PageCard/index.vue'
</script>

<template>
  <PageCard>
    <template #header>账号管理</template>
    <template #default>
      <el-form label-width="auto" style="width: 100%">
        <div class="form-grid">
          <div class="form-column">
            <el-form-item label="用户名" label-position="top">
              <el-input type="text" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="新密码" label-position="top">
              <el-input type="password" placeholder="请输入新密码"></el-input>
            </el-form-item>
          </div>
          <div class="form-column">
            <el-form-item label="原密码" label-position="top">
              <el-input type="password" placeholder="请输入原密码"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" label-position="top">
              <el-input type="password" placeholder="请再次输入新密码"></el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </template>
    <template #footer>
      <el-button color="#000">更新密码</el-button>
    </template>
  </PageCard>
</template>

<style scoped lang="scss">
.form-grid {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.form-column {
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>