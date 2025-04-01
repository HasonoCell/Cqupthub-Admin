<script setup>
import PageCard from "@/components/PageCard/index.vue";
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { changeContactService, getContactService } from "../../api/contact";

const formRef = ref();

const formModel = ref({
  studioAddr: "",
  phoneNum: "",
  email: "",
  qq: "",
});

const getContact = async () => {
  const { data } = await getContactService();
  formModel.value = data;
};

onMounted(async () => {
  try {
    getContact();
  } catch (error) {
    ElMessage.error("获取联系方式失败:", error);
  }
});

const rules = {
  studioAddr: [
    { required: true, message: "请输入工作室地址", trigger: "blur" },
    {
      pattern: /\S/,
      message: "地址内容不能为空",
      trigger: "blur",
    },
  ],
  phoneNum: [
    { required: true, message: "请输入电话号码", trigger: "blur" },
    {
      pattern: /^\S{11}$/,
      message: "电话号码必须是11位的非空字符",
      trigger: "blur",
    },
  ],
  email: [
    { required: true, message: "请输入邮箱账号", trigger: "blur" },
    {
      pattern: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      message: "邮箱格式不正确",
      trigger: "blur",
    },
  ],
  qq: [
    { required: true, message: "请输入联系QQ", trigger: "blur" },
    {
      pattern: /^[1-9]\d{4,}$/,
      message: "QQ号必须为5位以上数字且不以0开头",
      trigger: ["blur", "change"],
    },
  ],
};

const handleChange = async () => {
  try {
    await formRef.value.validate();
    await changeContactService(formModel.value);
    ElMessage.success("更改成功");
    getContact()
  } catch (error) {
    ElMessage.error("请正确填写所有必填项");
  }
};
</script>

<template>
  <PageCard>
    <template #header>
      <span>联系方式设置</span>
    </template>
    <template #default>
      <el-form
        label-width="auto"
        style="width: 100%"
        :model="formModel"
        :rules="rules"
        ref="formRef"
      >
        <div class="form-grid">
          <div class="form-column">
            <el-form-item
              label="工作室地址"
              label-position="top"
              prop="studioAddr"
            >
              <el-input
                type="text"
                placeholder="请输入工作室地址"
                v-model="formModel.studioAddr"
              ></el-input>
            </el-form-item>
            <el-form-item label="邮箱地址" label-position="top" prop="email">
              <el-input
                type="text"
                placeholder="请输入邮箱地址"
                v-model="formModel.email"
              ></el-input>
            </el-form-item>
          </div>
          <div class="form-column">
            <el-form-item label="联系电话" label-position="top" prop="phoneNum">
              <el-input
                type="text"
                placeholder="请输入联系电话"
                v-model="formModel.phoneNum"
              ></el-input>
            </el-form-item>
            <el-form-item label="联系QQ" label-position="top" prop="qq">
              <el-input
                type="text"
                placeholder="请输入联系QQ"
                v-model="formModel.qq"
              ></el-input>
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

:deep(.el-form-item__label) {
  font-size: 18px;
  font-weight: 600;
}
</style>
