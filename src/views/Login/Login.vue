<script setup>
import { ref } from "vue";
import { useUserStore } from "../../store";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

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
const handleLogin = async () => {
    await formRef.value.validate();
  /* const res = await userLoginService(formModel.value) // 这里userLoginService返回token，未定义
    userStore.setToken(res.data.data) */
  ElMessage.success("登录成功");
  router.push("/");
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
              placeholder="请输入用户名"
              v-model="formModel.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
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
  opacity: 1;
  background: linear-gradient(270deg, rgba(0, 0, 0, 0) 0%, #000000 75%);
}
.logo {
  background: url("@/assets/login-logo.png") no-repeat 50% center / 544px auto;
}
.login {
  display: flex;
  align-items: center;
}
.login-contain {
  width: 506px;
  height: 282px;
  border-radius: 23px;
  opacity: 1;
  background: #ffffff;
  box-shadow: 12px 16px 10px 0px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .title {
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: 300;
  }

  .el-input {
    width: 355px;
    height: 42px;
    border-radius: 5px;
    opacity: 1;
    box-sizing: border-box;
    border: 1px solid #000000;
  }

  .el-button {
    width: 256px;
    height: 30px;
    border-radius: 5px;
    background: #28d1c6;
    color: #ffffff;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); // 贝塞尔曲线过渡

    // 悬停状态
    &:hover {
      background: darken(#28d1c6, 16.39%); // 颜色加深
      transform: translateY(-2px); // 上浮效果
      box-shadow: 0 4px 12px rgba(40, 209, 198, 0.3); // 动态阴影
    }
  }
}
</style>
