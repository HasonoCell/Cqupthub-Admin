<script setup>
import PageCard from "@/components/PageCard/index.vue";
import { Plus } from "@element-plus/icons-vue";
import { ref, computed, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { useDepartmentStore } from "@/store/modules/department";
import {
  addDepartmentService,
  editDepartmentService,
  deleteDepartmentService,
} from "../../api/department";

defineProps({
  activeButton: String,
});

const formRef = ref();
const departmentStore = useDepartmentStore();
const departments = computed(() => departmentStore.departments);
const displayedDepartments = computed(() => departments.value.slice(0, 8));
const isDrawerVisible = ref(false);
const isEdit = ref(false);
const currentId = ref(null);

const editFormData = ref({
  departName: "",
  personAvatar: "",
  personName: "",
  email: "",
  personIntro: "",
  previewImage: "",
});

const rules = {
  departName: [
    { required: true, message: "请输入部门名称", trigger: "blur" },
    {
      min: 3,
      max: 10,
      message: "部门名称必须包含3-10位的字符",
      trigger: "blur",
    },
  ],
  personName: [
    { required: true, message: "请输入部长名称", trigger: "blur" },
    {
      min: 2,
      max: 10,
      message: "部长名称必须包含至少2位的字符",
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
};

const editDepart = (ID, department) => {
  isEdit.value = true;
  currentId.value = ID;
  isDrawerVisible.value = true;

  editFormData.value = {
    departName: department.departName,
    personAvatar: department.personAvatar,
    personName: department.personName,
    email: department.email,
    personIntro: department.personIntro,
  };
};

const editDepartSubmit = async () => {
  try {
    await formRef.value.validate();
    ElMessage.info("上传中，请耐心等待");
    const formData = new FormData();
    formData.append("departName", editFormData.value.departName);
    formData.append("personName", editFormData.value.personName);
    formData.append("email", editFormData.value.email);
    formData.append("personIntro", editFormData.value.personIntro);
    formData.append("image", editFormData.value.personAvatar);
    await editDepartmentService(currentId.value, formData);
    await departmentStore.getDepart();
    ElMessage.success("修改成功");
    isDrawerVisible.value = false;
    formRef.value.resetFields();
  } catch (error) {
    ElMessage.error("修改失败");
  }
};

const addDepart = () => {
  isEdit.value = false;
  isDrawerVisible.value = true;
  formRef.value?.resetFields();

  editFormData.value = {
    departName: "",
    personName: "",
    email: "",
    personAvatar: "",
    personIntro: "",
  };
};

const addDepartSubmit = async () => {
  try {
    await formRef.value.validate();
    const formData = new FormData();
    formData.append("departName", editFormData.value.departName);
    formData.append("personName", editFormData.value.personName);
    formData.append("email", editFormData.value.email);
    formData.append("personIntro", editFormData.value.personIntro);
    formData.append("image", editFormData.value.personAvatar);
    await addDepartmentService(formData);
    await departmentStore.getDepart();
    ElMessage.success("添加成功");
    isDrawerVisible.value = false;
    formRef.value.resetFields();
  } catch (error) {
    ElMessage.error("添加失败");
  }
};

const deleteDepart = async (ID) => {
  try {
    await ElMessageBox.confirm("确定删除该部门吗？", "警告", {
      type: "warning",
      confirmButtonText: "确定",
      cancelButtonText: "取消",
    });
    await deleteDepartmentService(ID);
    await departmentStore.getDepart();
    ElMessage.success("删除成功");
  } catch (error) {
    if (error !== "cancel") {
      ElMessage.error("删除失败");
    }
  }
};

const onUploadFile = (file) => {
  const previewURL = URL.createObjectURL(file.raw);
  editFormData.value.personAvatar = file.raw;
  editFormData.value.previewImage = previewURL;
};

onMounted(async () => {
  await departmentStore.getDepart();
});
</script>

<template>
  <PageCard v-if="activeButton === 'departManage'">
    <template #header>部门管理</template>
    <template #default>
      <!-- 部长信息展示 -->
      <el-row :gutter="20" class="card-container">
        <el-col
          v-for="department in displayedDepartments"
          :key="department.ID"
          :xs="24"
          :sm="12"
          :md="8"
          :lg="6"
          class="card-column"
        >
          <el-card class="depart-card">
            <div class="info-card-content">
              <div class="infro-avatar">
                <img
                  :src="'http://' + department.personAvatar"
                  alt="图片加载失败"
                  v-if="department.personAvatar"
                />
                <div class="avatar-placeholder" v-else></div>
              </div>
              <p class="department">{{ department.departName }}</p>
              <p class="name">{{ department.personName }}</p>
              <div class="actions">
                <el-tag
                  type="primary"
                  @click="editDepart(department.ID, department)"
                  class="action-tag"
                  >编辑</el-tag
                >
                <el-tag
                  type="danger"
                  @click="deleteDepart(department.ID)"
                  class="action-tag"
                  >删除</el-tag
                >
              </div>
            </div>
          </el-card>
        </el-col>

        <!-- 添加部门卡片 -->
        <el-col
          v-if="departments.length < 8"
          :xs="24"
          :sm="12"
          :md="8"
          :lg="6"
          class="card-column"
        >
          <el-card class="add-card">
            <div class="add-card-content" @click="addDepart">
              <el-button class="custom-add-button" :icon="Plus">
                添加部门
              </el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </template>
  </PageCard>

  <!-- 编辑区域 -->
  <el-drawer
    :title="isEdit ? '编辑部门' : '添加部门'"
    v-model="isDrawerVisible"
    :size="'30%'"
    direction="rtl"
    :with-header="false"
  >
    <el-form
      label-width="120px"
      :model="editFormData"
      :rules="rules"
      ref="formRef"
    >
      <el-form-item label="部门名称:" label-position="top" prop="departName">
        <el-input v-model="editFormData.departName" />
      </el-form-item>

      <el-form-item label="部长头像:" label-position="top">
        <div class="avatar-upload">
          <el-image
            :src="
              editFormData.previewImage || 'http://' + editFormData.personAvatar
            "
          />
          <el-upload
            :auto-upload="false"
            :show-file-list="false"
            :on-change="onUploadFile"
          >
            <el-button color="#000" label-position="top">更换</el-button>
          </el-upload>
        </div>
      </el-form-item>

      <el-form-item label="部长姓名:" label-position="top" prop="personName">
        <el-input v-model="editFormData.personName" />
      </el-form-item>

      <el-form-item label="部长邮箱:" label-position="top" prop="email">
        <el-input v-model="editFormData.email" />
      </el-form-item>

      <el-form-item label="部长介绍:" label-position="top" prop="personIntro">
        <el-input
          v-model="editFormData.personIntro"
          type="textarea"
          :rows="10"
        />
      </el-form-item>
      <div class="confirm-button">
        <el-button
          color="#000"
          type="primary"
          @click="isEdit ? editDepartSubmit() : addDepartSubmit()"
          >确定</el-button
        >
      </div>
    </el-form>
  </el-drawer>
</template>

<style scoped lang="scss">
.card-container {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
}

.card-column {
  margin-bottom: 20px;
}

.depart-card {
  transition: transform 0.3s ease;
  height: 240px;
  border: 2px solid #ebebeb;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.08);
}

.add-card {
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease;
  height: 240px;
  border: 2px solid #ebebeb;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.08);
}

.depart-card:hover,
.add-card:hover {
  transform: scale(1.05);
}

.info-card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.infro-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 10px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
  }
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(0.2);
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  background-color: #d9d9d9;
}

.department {
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
}

.name {
  margin-top: 5px;
  text-align: center;
}

.actions {
  margin-top: auto;
}

.action-tag {
  margin-right: 5px;
  color: #999;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    filter: brightness(0.9);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
}

.add-card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.custom-add-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 15px;
  border: 2px dashed #dcdfe6;
  border-radius: 4px;
  background-color: #fff;
  color: #606266;
  font-size: 14px;
  transition: all 0.3s ease;

  &:hover {
    border-color: #666;
    color: #666;
    background-color: #f2f2f2;
  }
}

.confirm-button {
  display: flex;
  justify-content: flex-end;
}

.avatar-upload {
  display: flex;
  align-items: flex-end;
  gap: 20px;

  .el-image {
    width: 150px;
    height: 150px;
  }
}

:deep(.el-form-item__label) {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
}
</style>
