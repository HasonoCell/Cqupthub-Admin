<script setup>
import PageCard from '@/components/PageCard/index.vue'
</script>

<template>
  <PageCard>
    <template #header>联系方式设置</template>
    <template #default>
      <el-form label-width="auto" style="width: 100%">
        <div class="form-grid">
          <div class="form-column">
            <el-form-item label="公司地址" label-position="top">
              <el-input type="text" placeholder="请输入公司地址"></el-input>
            </el-form-item>
            <el-form-item label="邮箱地址" label-position="top">
              <el-input type="password" placeholder="请输入邮箱地址"></el-input>
            </el-form-item>
          </div>
          <div class="form-column">
            <el-form-item label="联系电话" label-position="top">
              <el-input type="password" placeholder="请输入联系电话"></el-input>
            </el-form-item>
            <el-form-item label="微信公众号" label-position="top">
              <el-input type="password" placeholder="请输入微信公众号"></el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <div class="online-map">
        <span>在线地图</span>
        <div class="map"></div>
      </div>
    </template>
    <template #footer>
      <el-button color="#000">保存更改</el-button>
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

.online-map {
  font-weight: 200;
  font-size: 14px;

  .map {
    background-color: #00ffff;
    height: 200px;
    width: 100%;
    margin-top: 8px;
  }
}
</style>