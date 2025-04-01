<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { userLoginService } from "../../api/user";

const formRef = ref();
const router = useRouter();

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

const handleLogin = async () => {
  try {
    await formRef.value.validate();
    await userLoginService(formModel.value);

    localStorage.setItem('isLoggedIn', 'true')
    ElMessage.success("登录成功");

    const redirect = router.currentRoute.value.query.redirect || '/'
    router.push(redirect);
  } catch (error) {
    localStorage.removeItem('isLoggedIn')
    ElMessage.error("用户名或密码错误");
  }
};
</script>

<template>
  <el-row class="container">
    <el-col :span="9" :offset="3" class="logo" />
    <el-col :span="8" :offset="1" class="login">
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
          <el-form-item>
            <el-button @click="handleLogin">登录</el-button>
          </el-form-item>
        </el-form>
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
  width: 500px;
  height: 280px;
  border-radius: 24px;
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

  .el-form-item {
    width: 355px;
  }

  .el-input {
    width: 100%;
    min-width: 200px;
    height: 42px;
    border-radius: 5px;
    border: 1px solid #000000;
  }

  .el-button {
    width: 100%;
    border-radius: 5px;
    background: #28d1c6;
    color: #ffffff;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      background: #108f86;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(40, 209, 198, 0.3);
    }
  }
}
</style>
