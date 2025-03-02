<script setup>
import PageCard from '@/components/PageCard/index.vue'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

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
  qqNum: [
    { required: true, message: '请输入联系QQ', trigger: 'blur' },
  ],
}

const formRef = ref()

const handleChange = async () => {
  try {
    await formRef.value.validate()
    console.log('保存联系方式...')
    // 这里添加实际保存逻辑
  } catch (error) {
    console.error('表单验证失败:', error)
    ElMessage.error('请正确填写所有必填项')
  }
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
              <el-input type="text" placeholder="请输入邮箱地址"
              v-model="formModel.email"></el-input>
            </el-form-item>
          </div>
          <div class="form-column">
            <el-form-item label="联系电话" label-position="top" prop="phoneNum">
              <el-input type="text" placeholder="请输入联系电话"
              v-model="formModel.phoneNum"></el-input>
            </el-form-item>
            <el-form-item label="联系QQ" label-position="top" prop="qqNum">
              <el-input type="text" placeholder="请输入联系QQ"
              v-model="formModel.qqNum"></el-input>
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