<script setup>
import PageCard from "@/components/PageCard/index.vue";
import { computed, ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { useProjectStore } from "../../store";
import {
  editProjectService,
  addProjectService,
  deleteProjectService,
  showProjectService,
} from "../../api/project";

defineProps({
  activeButton: String,
});

const editFormData = ref({
  projectName: "",
  projectPath: "",
  projectImage: "",
  previewImage: "",
});

const rules = {
  projectName: [
    { required: true, message: "请输入项目名称", trigger: "blur" },
    {
      min: 3,
      message: "项目名称必须包含至少3位的字符",
      trigger: "blur",
    },
  ],
  projectPath: [{ required: true, message: "请输入项目地址", trigger: "blur" }],
};

const projectStore = useProjectStore();
const scrollContainer = ref(null);
const isDrawerVisible = ref(false);
const isEdit = ref(false);
const isSave = ref(false);
const formRef = ref();
const currentId = ref();
const selectedProjectsID = ref([]);

const allProjects = computed(() => projectStore.projects);
const displayedProjects = computed(() => {
  return allProjects.value.filter((project) => project.isDisplay === true);
});
const displayedProjectsID = computed(() => {
  return displayedProjects.value.map((project) => project.ID);
});

const changeProject = async () => {
  if (isSave.value) {
    try {
      await showProjectService(selectedProjectsID.value);
      await projectStore.getProject();
      isSave.value = false;
      selectedProjectsID.value = [];
      ElMessage.success("展示项目更新成功");
      nextTick(() => {
        scrollContainer.value?.update();
      });
    } catch (error) {
      selectedProjectsID.value = [];
      ElMessage.error("更新失败");
    }
  } else {
    selectedProjectsID.value = [...displayedProjectsID.value];
    isSave.value = true;
    ElMessage.warning("请选择需要展示的项目");
  }
};

const selectProject = (projectId) => {
  if (!isSave.value) return;

  const selected = new Set(selectedProjectsID.value);
  selected.has(projectId)
    ? selected.delete(projectId)
    : selected.add(projectId);
  selectedProjectsID.value = Array.from(selected);
};

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
    projectImage: project.projectImage,
  };
};

const editProjectSubmit = async () => {
  try {
    await formRef.value.validate();
    ElMessage.warning("上传中，请耐心等待");
    const formData = new FormData();
    formData.append("projectName", editFormData.value.projectName);
    formData.append("projectPath", editFormData.value.projectPath);
    // get时图片字段为projectImage，post/put时图片字段为image
    formData.append("image", editFormData.value.projectImage);
    await editProjectService(currentId.value, formData);
    await projectStore.getProject();
    ElMessage.success("修改成功");
    isDrawerVisible.value = false;
    formRef.value.resetFields();
  } catch (error) {
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
    ElMessage.warning("上传中，请耐心等待");
    const formData = new FormData();
    formData.append("projectName", editFormData.value.projectName);
    formData.append("projectPath", editFormData.value.projectPath);
    // get时图片字段为projectImage，post时图片字段为image
    formData.append("image", editFormData.value.projectImage);
    await addProjectService(formData);
    await projectStore.getProject();
    ElMessage.success("添加成功");
    isDrawerVisible.value = false;
    formRef.value.resetFields();
  } catch (error) {
    ElMessage.error("添加失败");
  }
};

const onUploadFile = (file) => {
  const previewURL = URL.createObjectURL(file.raw);
  editFormData.value.projectImage = file.raw;
  editFormData.value.previewImage = previewURL;
};

onMounted(async () => {
  await projectStore.getProject();
});

onBeforeUnmount(() => {
  if (editFormData.value.previewImage) {
    URL.revokeObjectURL(editFormData.value.previewImage);
  }
});
</script>

<template>
  <PageCard v-if="activeButton === 'project'">
    <template #header>
      <div>实践项目展示</div>
      <el-button color="#000" @click="changeProject">{{
        isSave ? "保存" : "更改"
      }}</el-button>
    </template>

    <template #default>
      <!-- 实践项目展示 -->
      <div class="displayed-project">
        <el-scrollbar ref="scrollContainer">
          <el-row :gutter="30" class="card-container">
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
                    :src="'http://' + project.projectImage"
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
          <el-button class="custom-add-button" :icon="Plus" @click="addProject">
            添加项目
          </el-button>
        </div>

        <div class="all-project-main">
          <el-row :gutter="30" class="card-container">
            <el-col
              v-for="project in allProjects"
              :xs="24"
              :sm="12"
              :md="8"
              :lg="6"
              class="card-column"
            >
              <el-card
                class="project-card"
                :class="{
                  'selected-card': selectedProjectsID.includes(project.ID),
                  'cursor-mode': isSave,
                }"
                @click="selectProject(project.ID)"
              >
                <div class="project-image">
                  <img
                    :src="'http://' + project.projectImage"
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
        </div>
      </div>

      <!-- 编辑区域 -->
      <el-drawer
        v-model="isDrawerVisible"
        :size="'30%'"
        direction="rtl"
        :with-header="false"
        :close-on-press-escape="false"
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
                :src="
                  editFormData.previewImage ||
                  'http://' + editFormData.projectImage
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

          <el-form-item
            label="项目标题:"
            label-position="top"
            prop="projectName"
          >
            <el-input v-model="editFormData.projectName" />
          </el-form-item>

          <el-form-item
            label="项目地址:"
            label-position="top"
            prop="projectPath"
          >
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

.project-card {
  transition: transform 0.3s ease;
  border: 2px solid #ebebeb;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.08);
  margin-bottom: 20px;

  &:hover {
    transform: scale(1.025);
  }

  &.cursor-mode {
    cursor: pointer;
  }

  &.selected-card {
    box-shadow: 0 2px 12px 0 rgb(60, 60, 60);
  }
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

  .el-image {
    width: 300px;
    height: 200px;
  }
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
