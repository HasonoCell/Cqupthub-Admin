<script setup>
import { ref } from "vue";
import { Plus } from "@element-plus/icons-vue";

const jobCategories = ref([
  {
    id: 1,
    name: "产品策划及运营部",
    jobs: [
      { id: 101, name: "实习产品经理" },
      { id: 102, name: "高级产品经理" },
      { id: 103, name: "工作室运营" },
    ],
  },
  {
    id: 2,
    name: "技术研发部",
    jobs: [
      { id: 201, name: "前端开发工程师" },
      { id: 202, name: "后端开发工程师" },
    ],
  },
  {
    id: 3,
    name: "市场营销部",
    jobs: [
      { id: 301, name: "营销策划专员" },
      { id: 302, name: "新媒体运营" },
      { id: 303, name: "市场推广经理" },
      { id: 304, name: "品牌公关" },
    ],
  },
  {
    id: 4,
    name: "人力资源部",
    jobs: [
      { id: 401, name: "招聘专员" },
      { id: 402, name: "薪酬福利专员" },
      { id: 403, name: "培训发展经理" },
    ],
  },
  {
    id: 5,
    name: "财务部",
    jobs: [
      { id: 501, name: "会计" },
      { id: 502, name: "出纳" },
      { id: 503, name: "税务专员" },
    ],
  },
  {
    id: 6,
    name: "行政部",
    jobs: [
      { id: 601, name: "行政助理" },
      { id: 602, name: "前台接待" },
      { id: 603, name: "后勤保障" },
    ],
  },
  {
    id: 7,
    name: "法务部",
    jobs: [
      { id: 701, name: "法务专员" },
      { id: 702, name: "律师" },
    ],
  },
]);

const expandedCategories = ref([]);
const hoverCategory = ref(null);
const hoverJob = ref(null);
const isDrawerVisible = ref(false);
const editFormData = ref({
  name: "",
  requirements: "",
  email: "",
});
const selectedJob = ref(null);

const toggleExpand = (index) => {
  const idx = expandedCategories.value.indexOf(index);
  if (idx === -1) {
    expandedCategories.value.push(index);
  } else {
    expandedCategories.value.splice(idx, 1);
  }
};

const openEditDrawer = (categoryId, jobId) => {
  const category = jobCategories.value.find((cate) => cate.id === categoryId);
  selectedJob.value = category.jobs.find((job) => job.id === jobId);
  editFormData.value = { ...selectedJob.value };
  isDrawerVisible.value = true;
};

const handleConfirm = () => {
  selectedJob.value.name = editFormData.value.name;
  selectedJob.value.requirements = editFormData.value.requirements;
  selectedJob.value.email = editFormData.value.email;
  isDrawerVisible.value = false;
};

const deleteJob = (categoryId, jobId) => {
  const category = jobCategories.value.find((cat) => cat.id === categoryId);
  if (category) {
    category.jobs = category.jobs.filter((job) => job.id !== jobId);
  }
};

defineProps({
  activeButton: String,
});
</script>

<template>
  <el-card v-if="activeButton === 'jobRecruit'">
    <div class="job-recruitment">
      <!-- 滚动区域 -->
      <el-scrollbar style="max-height: 800px; overflow-y: auto">
        <div
          v-for="(category, index) in jobCategories"
          :key="category.id"
          class="job-category"
        >
          <!-- 岗位大类 -->
          <div
            class="category-header"
            @mouseenter="hoverCategory = index"
            @mouseleave="hoverCategory = null"
            :class="{ 'hovered-category': hoverCategory === index }"
          >
            <span>{{ category.name }}</span>
            <el-button
              type="primary"
              color="#fff"
              :icon="Plus"
              circle
              @click="toggleExpand(index)"
            ></el-button>
          </div>

          <!-- 细分岗位 -->
          <el-collapse-transition>
            <div v-if="expandedCategories.includes(index)" class="sub-jobs">
              <div
                v-for="job in category.jobs"
                :key="job.id"
                class="job-item"
                @mouseenter="hoverJob = job.id"
                @mouseleave="hoverJob = null"
                :class="{ 'hovered-job': hoverJob === job.id }"
              >
                <span>{{ job.name }}</span>
                <div class="actions">
                  <el-button
                    type="primary"
                    icon="edit"
                    color="#fff"
                    circle
                    @click="openEditDrawer(category.id, job.id)"
                  ></el-button>
                  <el-button
                    type="danger"
                    icon="delete"
                    circle
                    @click="deleteJob(category.id, job.id)"
                  ></el-button>
                </div>
              </div>
            </div>
          </el-collapse-transition>
        </div>
      </el-scrollbar>

      <!-- 编辑抽屉 -->
      <el-drawer
        v-model="isDrawerVisible"
        :size="'50%'"
        direction="rtl"
        :with-header="false"
        :show-close="false"
      >
        <el-form :model="editFormData" label-width="80px">
          <el-form-item label="岗位名称" label-position="top">
            <el-input
              v-model="editFormData.name"
              placeholder="请输入岗位名称"
            ></el-input>
          </el-form-item>

          <el-form-item label="岗位要求" label-position="top">
            <el-input
              type="textarea"
              v-model="editFormData.requirements"
            ></el-input>
          </el-form-item>

          <el-form-item label="简历投递" label-position="top">
            <el-input
              v-model="editFormData.email"
              placeholder="请输入邮箱"
            ></el-input>
          </el-form-item>
        </el-form>

        <el-button @click="isDrawerVisible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </el-drawer>
    </div>
  </el-card>
</template>

<style scoped>
.el-card {
  height: 100vh;
}

.job-recruitment {
  padding: 16px;
}

/* 岗位大类行样式 */
.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #fff;
  color: #333;
  font-size: larger;
  font-weight: 600;
  border-radius: 8px;
  border: 2px solid #000;
  margin-bottom: 12px;
  transition: background-color 0.3s ease;

  &:hover .el-button {
    background-color: inherit !important;
    --el-button-hover-bg-color: inherit;
  }

  .el-button {
    border: none;
    font-size: 30px;
    background-color: transparent;
    transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
      color 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  }
}

.category-header.hovered-category {
  background-color: #ccc;
  color: #111;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);

  .el-button {
    background-color: inherit;
  }
}

/* 子岗位列表 */
.sub-jobs {
  padding-left: 20px;
}

/* 子岗位行样式 */
.job-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  margin-bottom: 8px;
  background-color: #f8f8f8;
  color: #444;
  font-weight: 600;
  border-radius: 6px;
  border: 1px solid #000;
  transition: background-color 0.3s ease;
}

.job-item.hovered-job {
  background-color: #ddd;
  color: #222;
}

.actions {
  display: flex;
}
</style>
