<script setup>
import { ref } from "vue";
import PageCard from "@/components/PageCard/index.vue";

// 岗位招聘数据
const jobCategories = ref([
  {
    name: "产品策划及运营部",
    expanded: false,
    positions: ["实习产品经理", "实习产品经理", "工作室运营"],
  },
  {
    name: "研发部",
    expanded: false,
    positions: ["后端开发工程师", "前端开发工程师", "测试工程师"],
  },
]);

// 切换展开/收起岗位大类
const toggleCategory = (index) => {
  jobCategories.value[index].expanded = !jobCategories.value[index].expanded;
};

// 编辑岗位
const editPosition = (categoryName, positionName) => {
  console.log(`编辑岗位：${categoryName} - ${positionName}`);
};

// 删除岗位
const deletePosition = (categoryName, positionName) => {
  console.log(`删除岗位：${categoryName} - ${positionName}`);
};

defineProps({
  activeTab: String,
});
</script>

<template>
  <PageCard v-if="activeTab === 'jobRecruit'">
    <template #default>
        <div class="job-recruitment">
        <el-card
          v-for="(category, index) in jobCategories"
          :key="index"
          class="job-category-card"
        >
          <div class="job-category-header" @click="toggleCategory(index)">
            <span>{{ category.name }}</span>
            <i class="el-icon-plus" v-if="!category.expanded"></i>
            <i class="el-icon-minus" v-else></i>
          </div>
          <el-collapse-transition>
            <div v-show="category.expanded" class="job-positions">
              <el-card
                v-for="(position, posIndex) in category.positions"
                :key="posIndex"
                class="job-position-card"
              >
                <span>{{ position }}</span>
                <div class="job-actions">
                  <el-button @click="editPosition(category.name, position)" class="edit-button">
                    <i class="el-icon-edit"></i>
                  </el-button>
                  <el-button @click="deletePosition(category.name, position)" class="delete-button">
                    <i class="el-icon-delete"></i>
                  </el-button>
                </div>
              </el-card>
            </div>
          </el-collapse-transition>
        </el-card>
      </div>
    </template>
  </PageCard>
</template>

<style scoped lang="scss">
.job-recruitment {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.job-category-card {
  border: 1px solid #dcdfe6;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
}

.job-category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  padding: 10px;
  cursor: pointer;
}

.job-positions {
  padding: 10px;
}

.job-position-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

/* 操作按钮样式 */
.job-actions {
  display: flex;
}

.edit-button,
.delete-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px; /* 调整字体大小 */
  padding: 0; /* 移除内边距 */
  margin: 0; /* 移除外边距 */
  color: #999; /* 设置颜色 */
}

.edit-button:hover,
.delete-button:hover {
  color: #666; /* 悬浮时颜色 */
}
</style>
