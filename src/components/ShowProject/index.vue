<script setup>
import PageCard from "@/components/PageCard/index.vue";
import { computed, ref } from "vue";

const allProjects = ref([
  { image: "", name: "实践项目A", url: "http://example.com/a" },
  { image: "", name: "实践项目B", url: "http://example.com/b" },
  { image: "", name: "实践项目C", url: "http://example.com/c" },
  { image: "", name: "实践项目D", url: "http://example.com/d" },
  { image: "", name: "实践项目E", url: "http://example.com/e" },
  { image: "", name: "实践项目F", url: "http://example.com/f" },
  { image: "", name: "实践项目G", url: "http://example.com/g" },
  { image: "", name: "实践项目H", url: "http://example.com/h" },
]);

const displayedProjects = computed(() => allProjects.value.slice(0, 5));

defineProps({
  activeButton: String,
});
</script>

<template>
  <PageCard v-if="activeButton === 'project'">
    <template #header>
      <div>实践项目展示</div>
      <el-button color="#000" type="primary">更换</el-button>
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
                <div class="project-card">
                  <el-card>
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
                </div>
              </el-col>
            </el-row>
          </el-scrollbar>
        </div>

        <!-- 实践项目库 -->
        <div class="all-project">
          <div class="all-project-header">
            <span>实践项目库</span>
            <el-button>添加项目</el-button>
          </div>
          <div class="all-project-main">
            <el-scrollbar>
              <el-row :gutter="20" class="card-container">
                <el-col
                  v-for="project in allProjects"
                  :xs="24"
                  :sm="12"
                  :md="8"
                  :lg="6"
                  class="card-column"
                >
                  <div class="project-card">
                    <el-card>
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
                  </div>
                </el-col>
              </el-row>
            </el-scrollbar>
          </div>
        </div>
      </div>
    </template>
  </PageCard>
</template>

<style scoped>
.projects {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.displayed-project {
  .card-container {
    display: flex;
    flex-wrap: nowrap;
  }
  margin-bottom: 40px;
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
  width: 220px;
  height: 160px;
  overflow: hidden;
  margin-bottom: 10px;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  background-color: #d9d9d9;
}

.actions {
  margin-top: auto;
  display: flex;
  justify-content: flex-end;
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
  display: flex;
  justify-content: space-between;
}
</style>
