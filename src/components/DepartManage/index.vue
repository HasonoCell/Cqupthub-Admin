<script setup>
import PageCard from "@/components/PageCard/index.vue";
import { Plus } from "@element-plus/icons-vue";
import { ref, computed } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

const persons = ref([
  {
    department: "产品策划及运营部",
    name: "王美力",
  },
  {
    department: "前端开发部",
    name: "陈波",
  },
  {
    department: "后端开发部",
    name: "钟雨廷",
  },
]);

const isDrawerVisible = ref(false);

const editFormData = ref({
  departName: "",
  personAvatar: "",
  personName: "",
  email: "",
  personIntro: "",
});

const displayedPersons = computed(() => persons.value.slice(0, 8));

const editDepart = () => {
  // 调用编辑api
  isDrawerVisible.value = true;
};

const deleteDepart = async (index) => {
  await ElMessageBox.confirm("你确定删除该部门信息吗？", "温馨提示", {
    type: "warning",
    confirmButtonText: "确认",
    cancelButtonText: "取消",
  });
  // 调用删除api
  ElMessage.success("删除成功");
  persons.value.splice(index, 1);
};

const addDepart = () => {
  // 调用增加api
  if (persons.value.length < 8) {
    persons.value.push({
      department: "新部门",
      name: "新成员",
    });
  }
};

const handleAvatarSuccess = () => {};

const beforeAvatarUpload = () => {};

const handleConfirm = () => {};

defineProps({
  activeButton: String,
});
</script>

<template>
  <PageCard v-if="activeButton === 'departManage'">
    <template #header>部门管理</template>
    <template #default>
      <el-row :gutter="20" class="card-container">
        <el-col
          v-for="(person, index) in displayedPersons"
          :key="index"
          :xs="24"
          :sm="12"
          :md="8"
          :lg="6"
          class="card-column"
        >
          <el-card shadow="hover" class="depart-card">
            <div class="info-card-content">
              <!-- 头像 -->
              <div class="infro-avatar">
                <img :src="person.avatar" alt="Avatar" v-if="person.avatar" />
                <div class="avatar-placeholder" v-else></div>
              </div>
              <!-- 部门 -->
              <p class="department">{{ person.department }}</p>
              <!-- 姓名 -->
              <p class="name">{{ person.name }}</p>
              <!-- 编辑/删除功能 -->
              <div class="actions">
                <el-tag type="primary" @click="editDepart()" class="action-tag"
                  >编辑</el-tag
                >
                <el-tag
                  type="danger"
                  @click="deleteDepart(index)"
                  class="action-tag"
                  >删除</el-tag
                >
              </div>
            </div>
          </el-card>
        </el-col>

        <!-- 添加部门卡片 -->
        <el-col
          v-if="persons.length < 8"
          :xs="24"
          :sm="12"
          :md="8"
          :lg="6"
          class="card-column"
        >
          <el-card shadow="hover" class="add-card">
            <div class="add-card-content" @click="addDepart">
              <div class="add-button">
                <el-icon><Plus /></el-icon>
                <span>添加部门</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </template>
    <template #footer>
      <el-button color="#000" @click="handleConfirm">保存更改</el-button>
    </template>
  </PageCard>

  <el-drawer
    v-model="isDrawerVisible"
    :size="'50%'"
    direction="rtl"
    :with-header="false"
  >
    <el-form label-width="120px" :model="editFormData">
      <el-form-item label="部门名称:" label-position="top">
        <el-input v-model="editFormData.departName" />
      </el-form-item>

      <el-form-item label="部长头像:" label-position="top">
        <div class="avatar-upload">
          <el-image
            style="width: 150px; height: 150px"
            :src="editFormData.personAvatar"
          />
          <el-upload
            class="upload-demo"
            action="your_upload_api"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :show-file-list="false"
          >
            <el-button color="#000" type="primary" label-position="top"
              >更换</el-button
            >
          </el-upload>
        </div>
      </el-form-item>

      <el-form-item label="部长姓名:" label-position="top">
        <el-input v-model="editFormData.personName" />
      </el-form-item>

      <el-form-item label="部长邮箱:" label-position="top">
        <el-input v-model="editFormData.email" />
      </el-form-item>

      <el-form-item label="部长介绍:" label-position="top">
        <el-input
          v-model="editFormData.personIntro"
          type="textarea"
          :rows="10"
        />
      </el-form-item>
      <div class="confirm-button">
        <el-button color="#000" type="primary">确定</el-button>
      </div>
    </el-form>
  </el-drawer>
</template>

<style scoped lang="scss">
.card-container {
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

.add-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  font-size: 16px;
  color: #c0c4cc;
  border: 1px dashed #c0c4cc;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;

  .el-icon {
    margin-right: 5px;
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
}

:deep(.el-form-item__label) {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
}
</style>
