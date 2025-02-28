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

// 如果人数超过8个，则只展示前8个
const displayedPersons = computed(() => persons.value.slice(0, 8));

const editPerson = (index) => {
  // 调用 edit 组件
  console.log("编辑人员：", displayedPersons.value[index]);
};

const deletePerson = async (index) => {
  await ElMessageBox.confirm("你确定删除该部门信息吗？", "温馨提示", {
    type: "warning",
    confirmButtonText: "确认",
    cancelButtonText: "取消",
  });
  // await 删除信息api函数
  ElMessage.success("删除成功");
  persons.value.splice(index, 1);
};

const addDepartment = () => {
  // 调用 edit 组件
  if (persons.value.length < 8) {
    persons.value.push({
      department: "新部门",
      name: "新成员",
    });
  }
};

defineProps({
  activeTab: String,
});
</script>

<template>
  <PageCard v-if="activeTab === 'departManage'">
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
          <el-card shadow="hover" class="person-card">
            <div class="info-card-content">
              <!-- 头像 -->
              <div class="avatar">
                <img :src="person.avatar" alt="Avatar" v-if="person.avatar" />
                <div class="avatar-placeholder" v-else></div>
              </div>
              <!-- 部门 -->
              <p class="department">{{ person.department }}</p>
              <!-- 姓名 -->
              <p class="name">{{ person.name }}</p>
              <!-- 编辑/删除功能 -->
              <div class="actions">
                <el-tag
                  type="primary"
                  @click="editPerson(index)"
                  class="action-tag"
                  >编辑</el-tag
                >
                <el-tag
                  type="danger"
                  @click="deletePerson(index)"
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
            <div class="add-card-content" @click="addDepartment">
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
      <el-button color="#000">保存更改</el-button>
    </template>
  </PageCard>
</template>

<style scoped lang="scss">
.card-container {
  display: flex;
  flex-wrap: wrap;
}

.card-column {
  margin-bottom: 20px;
}

.person-card {
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

.person-card:hover,
.add-card:hover {
  transform: scale(1.05);
}

.info-card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.avatar {
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
</style>
