<script setup>
import PageCard from "@/components/PageCard/index.vue";
import { ref } from "vue";

const formModel = ref({
  username: "",
  password: "",
  newPwd: "",
  reNewPwd: "",
});
const rules = {
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 5, max: 10, message: "用户名必须是5-10位的字符", trigger: "blur" },
  ],
  password: [{ required: true, message: "请输入原密码", trigger: "blur" }],
  newPwd: [
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
  reNewPwd: [
    { required: true, message: "请再次输入新密码", trigger: "blur" },
    {
      pattern: /^\S{6,15}$/,
      message: "密码必须是6-15的非空字符",
      trigger: "blur",
    },
    {
      validator: (rule, value, callback) => {
        if (value !== formModel.value.newPwd) {
          callback(new Error("两次输入密码不一致"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
};
const formRef = ref();
const handleChange = async () => {
  await formRef.value.validate();
  console.log("更新密码...");
};
</script>

<template>
  <PageCard>
    <template #header>账号管理</template>
    <template #default>
      <el-form
        label-width="auto"
        style="width: 100%"
        :model="formModel"
        :rules="rules"
      >
        <div class="form-grid">
          <div class="form-column">
            <el-form-item label="用户名" label-position="top" prop="username">
              <el-input
                type="text"
                placeholder="请输入用户名"
                v-model="formModel.username"
              ></el-input>
            </el-form-item>
            <el-form-item label="新密码" label-position="top" prop="newPwd">
              <el-input
                type="password"
                placeholder="请输入新密码"
                v-model="formModel.newPwd"
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
              prop="reNewPwd"
            >
              <el-input
                type="password"
                placeholder="请再次输入新密码"
                v-model="formModel.reNewPwd"
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
</style>
