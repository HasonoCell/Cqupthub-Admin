<script setup>
import PageCard from "@/components/PageCard/index.vue";
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { userChangePWDService } from "../../api/user";
import { useRouter } from 'vue-router'

const router = useRouter()
const formRef = ref();
const formModel = ref({
  username: "",
  password: "",
  newPassword: "",
  reNewPassword: "",
});

const rules = {
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 5, max: 10, message: "用户名必须是5-10位的字符", trigger: "blur" },
  ],
  password: [{ required: true, message: "请输入原密码", trigger: "blur" }],
  newPassword: [
    { required: true, message: "请输入新密码", trigger: "blur" },
    {
      pattern: /^\S{6,15}$/,
      message: "密码必须是6-15位的非空字符",
      trigger: "blur",
    },
    {
      validator: (rule, value, callback) => {
        if (value === formModel.value.password) {
          callback(new Error("新旧密码不能相同"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
  reNewPassword: [
    { required: true, message: "请再次输入新密码", trigger: "blur" },
    {
      pattern: /^\S{6,15}$/,
      message: "密码必须是6-15的非空字符",
      trigger: "blur",
    },
    {
      validator: (rule, value, callback) => {
        if (value !== formModel.value.newPassword) {
          callback(new Error("两次输入密码不一致"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
};

const handleChange = async () => {
  try {
    await formRef.value.validate();
    await userChangePWDService(formModel.value);
    ElMessage.success("密码更新成功");
    formRef.value.resetFields();
    localStorage.removeItem('isLoggedIn')
    router.push('/login')
    
  } catch (error) {
    ElMessage.error("请正确填写信息");
  }
};
</script>

<template>
  <PageCard>
    <template #header>
      <span>账号管理</span>
    </template>
    <template #default>
      <el-form :model="formModel" :rules="rules" ref="formRef">
        <div class="form-grid">
          <div class="form-column">
            <el-form-item label="用户名" label-position="top" prop="username">
              <el-input
                type="text"
                placeholder="请输入用户名"
                v-model="formModel.username"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="新密码"
              label-position="top"
              prop="newPassword"
            >
              <el-input
                type="password"
                placeholder="请输入新密码"
                v-model="formModel.newPassword"
              ></el-input>
            </el-form-item>
          </div>
          <div class="form-column">
            <el-form-item label="原密码" label-position="top" prop="password">
              <el-input
                type="password"
                placeholder="请输入原密码"
                v-model="formModel.password"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="确认新密码"
              label-position="top"
              prop="reNewPassword"
            >
              <el-input
                type="password"
                placeholder="请再次输入新密码"
                v-model="formModel.reNewPassword"
              ></el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </template>
    <template #footer>
      <el-button color="#000" @click="handleChange">更新密码</el-button>
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

:deep(.el-form-item__label) {
  font-size: 18px;
  font-weight: 600;
}
</style>
