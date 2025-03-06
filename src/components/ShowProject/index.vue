<script setup>
import PageCard from "@/components/PageCard/index.vue";
import { computed, ref } from "vue";
import { Plus } from "@element-plus/icons-vue";

const allProjects = ref([
  { image: "", name: "实践项目A", url: "http://example.com/a" },
  { image: "", name: "实践项目B", url: "http://example.com/b" },
  { image: "", name: "实践项目C", url: "http://example.com/c" },
  { image: "", name: "实践项目D", url: "http://example.com/d" },
  { image: "", name: "实践项目E", url: "http://example.com/e" },
  { image: "", name: "实践项目F", url: "http://example.com/f" },
  { image: "", name: "实践项目G", url: "http://example.com/g" },
  { image: "", name: "实践项目H", url: "http://example.com/h" },
  { image: "", name: "实践项目1", url: "http://example.com/1" },
  { image: "", name: "实践项目2", url: "http://example.com/2" },
  { image: "", name: "实践项目3", url: "http://example.com/3" },
  { image: "", name: "实践项目4", url: "http://example.com/4" },
  { image: "", name: "实践项目5", url: "http://example.com/5" },
  { image: "", name: "实践项目6", url: "http://example.com/6" },
  { image: "", name: "实践项目7", url: "http://example.com/7" },
  { image: "", name: "实践项目8", url: "http://example.com/8" },
]);

const displayedProjects = computed(() => allProjects.value.slice(0, 5));

const isDrawerVisible = ref(false);

const editFormData = ref({
  image: "",
  title: "",
  address: "",
});

const addProject = () => {
  isDrawerVisible.value = true;
};

const deleteProject = () => {};

const editProject = () => {
  isDrawerVisible.value = true;
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
                      :src="project.image"
                      alt="Avatar"
                      v-if="project.image"
                    />
                    <div v-else class="image-placeholder"></div>
                  </div>
                  <p class="project-name">{{ project.name }}</p>
                  <p class="project-address">{{ project.url }}</p>
                  <div class="actions">
                    <el-tag
                      type="primary"
                      class="action-tag"
                      @click="editProject"
                      >编辑</el-tag
                    >
                    <el-tag
                      type="danger"
                      class="action-tag"
                      @click="deleteProject"
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
                        :src="project.image"
                        alt="Avatar"
                        v-if="project.image"
                      />
                      <div v-else class="image-placeholder"></div>
                    </div>
                    <p class="project-name">{{ project.name }}</p>
                    <p class="project-address">{{ project.url }}</p>
                    <div class="actions">
                      <el-tag type="primary" class="action-tag">编辑</el-tag>
                      <el-tag type="danger" class="action-tag">删除</el-tag>
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
        <el-form label-width="120px" :model="editFormData">
          <el-form-item label="展示图片:" label-position="top">
            <div class="image-upload">
              <el-image
                style="width: 150px; height: 150px"
                :src="editFormData.image"
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
            <el-input v-model="editFormData.title" />
          </el-form-item>

          <el-form-item label="项目地址:" label-position="top">
            <el-input v-model="editFormData.address" />
          </el-form-item>
          <div class="confirm-button">
            <el-button color="#000" type="primary">确定</el-button>
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
