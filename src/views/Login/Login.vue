<script setup>
import { ref } from "vue";
import { useUserStore } from "../../store";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { userLoginService } from "../../api/user";

const formModel = ref({
  username: "",
  password: "",
});

const rules = {
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 5, max: 10, message: "用户名必须是5-10位的字符", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    {
      pattern: /^\S{6,15}$/,
      message: "密码必须是6-15位的非空字符",
      trigger: "blur",
    },
  ],
};

const formRef = ref();

const userStore = useUserStore();

const router = useRouter();

const loading = ref(false);
const handleLogin = async () => {
  try {
    loading.value = true;
    await formRef.value.validate();
    const res = await userLoginService(formModel.value);
    userStore.setToken(res.data);
    ElMessage.success("登录成功");
    router.push({ path: "/" });
  } catch (error) {
    ElMessage.error("用户名或密码错误");
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <el-row class="container">
    <el-col :span="9" :offset="3" class="logo" />
    <el-col :span="9" :offset="1" class="login">
      <div class="login-contain">
        <span class="title">登录</span>
        <el-form :model="formModel" :rules="rules" ref="formRef">
          <el-form-item prop="username">
            <el-input
              @keyup.enter="handleLogin"
              placeholder="请输入用户名"
              v-model="formModel.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              @keyup.enter="handleLogin"
              placeholder="请输入密码"
              v-model="formModel.password"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button @click="handleLogin">登录</el-button>
      </div>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
.container {
  height: 100vh;
  background: linear-gradient(270deg, rgba(0, 0, 0, 0) 0%, #000000 75%);
}

.logo {
  height: 100vh;
  min-width: 100px;
  min-height: 100px;
  background: url("@/assets/login-logo.png") no-repeat center center / contain;
}

.login {
  display: flex;
  align-items: center;
}

.login-contain {
  width: 506px;
  height: 282px;
  min-width: 200px;
  min-height: 160px;
  max-width: 90%;
  border-radius: 23px;
  background: #ffffff;
  box-shadow: 12px 16px 10px 0px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .title {
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: 400;
  }

  .el-input {
    width: 100%;
    max-width: 355px;
    min-width: 200px;
    height: 42px;
    border-radius: 5px;
    box-sizing: border-box;
    border: 1px solid #000000;
  }

  .el-button {
    width: 100%;
    max-width: 200px;
    min-width: 100px;
    height: 30px;
    border-radius: 5px;
    background: #28d1c6;
    color: #ffffff;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      background: darken(#28d1c6, 16.39%);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(40, 209, 198, 0.3);
    }
  }
}
</style>
