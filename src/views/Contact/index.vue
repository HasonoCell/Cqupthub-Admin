<script setup>
import PageCard from '@/components/PageCard/index.vue'
import { ref } from 'vue'

const formModel = ref({
  address: '',
  phoneNum: '',
  email: '',
  wechat: '',
})

const rules = {
  address: [
    { required: true, message: '请输入工作室地址', trigger: 'blur' },
  ],
  phoneNum: [
    { required: true, message: '请输入电话号码', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '请输入邮箱账号', trigger: 'blur' },
  ],
  wechat: [
    { required: true, message: '请输入联系QQ', trigger: 'blur' },
  ],
}

const formRef = ref()

const handleChange = async() => {
  await formRef.value.validate()
  console.log('保存联系方式...')
}
</script>

<template>
  <PageCard>
    <template #header>联系方式设置</template>
    <template #default>
      <el-form label-width="auto" style="width: 100%"
      :model="formModel" :rules="rules" ref="formRef">
        <div class="form-grid">
          <div class="form-column">
            <el-form-item label="工作室地址" label-position="top" prop="address">
              <el-input type="text" placeholder="请输入工作室地址"
              v-model="formModel.address"></el-input>
            </el-form-item>
            <el-form-item label="邮箱地址" label-position="top" prop="email">
              <el-input type="password" placeholder="请输入邮箱地址"
              v-model="formModel.email"></el-input>
            </el-form-item>
          </div>
          <div class="form-column">
            <el-form-item label="联系电话" label-position="top" prop="phoneNum">
              <el-input type="password" placeholder="请输入联系电话"
              v-model="phoneNum"></el-input>
            </el-form-item>
            <el-form-item label="联系QQ" label-position="top" prop="wechat">
              <el-input type="password" placeholder="请输入联系QQ"
              v-model="formModel.wechat"></el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </template>
    <template #footer>
      <el-button color="#000" @click="handleChange">保存更改</el-button>
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