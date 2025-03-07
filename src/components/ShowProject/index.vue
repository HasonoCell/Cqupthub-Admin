<script setup>
import PageCard from "@/components/PageCard/index.vue";
import { computed, ref, onMounted } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { useProjectStore } from "../../store/modules/project";
import {
  editProjectService,
  addProjectService,
  deleteProjectService,
} from "../../api/project";

const projectStore = useProjectStore();

onMounted(async () => {
  await projectStore.getProject();
});

const allProjects = computed(() => projectStore.projects);

const displayedProjects = computed(() => allProjects.value.slice(0, 5));

const isDrawerVisible = ref(false);

const isEdit = ref(false);

const currentId = ref(null);

const editFormData = ref({
  projectName: "",
  projectPath: "",
  image: "",
});

const formRef = ref();

const rules = [];

const deleteProject = async (ID) => {
  try {
    await ElMessageBox.confirm("确定删除该项目吗？", "警告", {
      type: "warning",
      confirmButtonText: "确定",
      cancelButtonText: "取消",
    });
    await deleteProjectService(ID);
    await projectStore.getProject();
    ElMessage.success("删除成功");
  } catch (error) {
    if (error !== "cancel") {
      ElMessage.error("删除失败");
    }
  }
};

const editProject = (ID, project) => {
  isEdit.value = true;
  currentId.value = ID;
  isDrawerVisible.value = true;

  editFormData.value = {
    projectName: project.projectName,
    projectPath: project.projectPath,
    image: project.projectImage,
  };
};

const editProjectSubmit = async () => {
  try {
    await formRef.value.validate();

    const formData = new FormData();
    formData.append("ID", currentId.value);
    formData.append("projectName", editFormData.value.projectName);
    formData.append("projectPath", editFormData.value.projectPath);

    await editProjectService(currentId.value, formData);
    await projectStore.getProject();
    ElMessage.success("修改成功");
    isDrawerVisible.value = false;
    formRef.value.resetFields();
  } catch (error) {
    console.error("编辑请求失败:", error.response || error);
    ElMessage.error("修改失败");
  }
};

const addProject = () => {
  isEdit.value = false;
  isDrawerVisible.value = true;
  formRef.value?.resetFields();

  editFormData.value = {
    projectName: "",
    projectPath: "",
    projectImage: "",
  };
};

const addProjectSubmit = async () => {
  try {
    await formRef.value.validate();

    const formData = new FormData();
    formData.append("projectName", editFormData.value.projectName);
    formData.append("projectPath", editFormData.value.projectPath);

    await addProjectService(formData);
    await projectStore.getProject();
    ElMessage.success("添加成功");
    isDrawerVisible.value = false;
    formRef.value.resetFields();
  } catch (error) {
    console.error("添加请求失败:", error.response || error);
    ElMessage.error("添加失败");
  }
};

const handleImageSuccess = () => {};

const beforeImageUpload = () => {};

const isSave = ref(false);
const changeProject = () => {
  isSave.value = !isSave.value;
  if (isSave) {
    console.log("changing...");
  } else {
    console.log("saving...");
  }
};

defineProps({
  activeButton: String,
});
</script>

<template>
  <PageCard v-if="activeButton === 'project'">
    <template #header>
      <div>实践项目展示</div>
      <el-button color="#000" type="primary" @click="changeProject">{{
        isSave ? "保存" : "更改"
      }}</el-button>
    </template>
    <template #default>
      <div class="projects">
        <!-- 实践项目展示 -->
        <div class="displayed-project">
          <el-scrollbar>
            <el-row :gutter="20" class="card-container">
              <el-col
                v-for="project in displayedProjects"
                :xs="24"
                :sm="12"
                :md="8"
                :lg="6"
                class="card-column"
              >
                <el-card class="project-card">
                  <div class="project-image">
                    <img
                      :src="project.projectImage"
                      alt="图片加载失败"
                      v-if="project.projectImage"
                    />
                    <div v-else class="image-placeholder"></div>
                  </div>
                  <p class="project-name">{{ project.projectName }}</p>
                  <p class="project-address">{{ project.projectPath }}</p>
                  <div class="actions">
                    <el-tag
                      type="primary"
                      class="action-tag"
                      @click="editProject(project.ID, project)"
                      >编辑</el-tag
                    >
                    <el-tag
                      type="danger"
                      class="action-tag"
                      @click="deleteProject(project.ID)"
                      >删除</el-tag
                    >
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-scrollbar>
        </div>

        <!-- 实践项目库 -->
        <div class="all-project">
          <div class="all-project-header">
            <p>实践项目库</p>
            <el-button
              class="custom-add-button"
              :icon="Plus"
              @click="addProject"
            >
              添加项目
            </el-button>
          </div>

          <div class="all-project-main">
            <el-scrollbar height="300px" always>
              <el-row :gutter="20" class="card-container">
                <el-col
                  v-for="project in allProjects"
                  :xs="24"
                  :sm="12"
                  :md="8"
                  :lg="6"
                  class="card-column"
                >
                  <el-card class="project-card">
                    <div class="project-image">
                      <img
                        :src="project.projectImage"
                        alt="图片加载失败"
                        v-if="project.projectImage"
                      />
                      <div v-else class="image-placeholder"></div>
                    </div>
                    <p class="project-name">{{ project.projectName }}</p>
                    <p class="project-address">{{ project.projectPath }}</p>
                    <div class="actions">
                      <el-tag
                        type="primary"
                        class="action-tag"
                        @click="editProject(project.ID, project)"
                        >编辑</el-tag
                      >
                      <el-tag
                        type="danger"
                        class="action-tag"
                        @click="deleteProject(project.ID)"
                        >删除</el-tag
                      >
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </el-scrollbar>
          </div>
        </div>
      </div>

      <!-- 编辑抽屉 -->
      <el-drawer
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
          <el-form-item label="展示图片:" label-position="top">
            <div class="image-upload">
              <el-image
                style="width: 150px; height: 150px"
                :src="editFormData.projectImage"
              />
              <el-upload
                class="upload-demo"
                action="your_upload_api"
                :on-success="handleImageSuccess"
                :before-upload="beforeImageUpload"
                :show-file-list="false"
              >
                <el-button color="#000" type="primary" label-position="top"
                  >更换</el-button
                >
              </el-upload>
            </div>
          </el-form-item>

          <el-form-item label="项目标题:" label-position="top">
            <el-input v-model="editFormData.projectName" />
          </el-form-item>

          <el-form-item label="项目地址:" label-position="top">
            <el-input v-model="editFormData.projectPath" />
          </el-form-item>
          <div class="confirm-button">
            <el-button
              color="#000"
              type="primary"
              @click="isEdit ? editProjectSubmit() : addProjectSubmit()"
              >确定</el-button
            >
          </div>
        </el-form>
      </el-drawer>
    </template>
  </PageCard>
</template>

<style scoped>
.project-card {
  transition: transform 0.3s ease;
  border: 2px solid #ebebeb;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.08);
}

.project-card:hover {
  transform: scale(1.025);
}

.displayed-project {
  .card-container {
    display: flex;
    flex-wrap: nowrap;
  }
  margin-bottom: 20px;
}

.all-project {
  .card-container {
    display: flex;
    flex-wrap: wrap;
  }
}

.card-column {
  margin-bottom: 20px;
}

.project-image {
  width: 100%;
  height: 160px;
  overflow: hidden;
  margin-bottom: 10px;
  display: flex;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  background-color: #d9d9d9;
}

.project-name {
  font-size: 16px;
  line-height: 24px;
}

.project-address {
  font-size: 14px;
  line-height: 20px;
  color: #6b7280;
}

.actions {
  margin-top: auto;
  display: flex;
  justify-content: flex-end;
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

.all-project-header {
  margin-bottom: 20px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;

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
  }

  .custom-add-button:hover {
    border-color: #666;
    color: #666;
    background-color: #f2f2f2;
  }
}

.image-upload {
  display: flex;
  align-items: flex-end;
  gap: 20px;
}

.confirm-button {
  display: flex;
  justify-content: flex-end;
}

:deep(.el-form-item__label) {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
}
</style>
