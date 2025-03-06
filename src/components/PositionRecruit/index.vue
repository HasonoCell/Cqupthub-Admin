<script setup>
import { ref, onMounted, computed } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { usePositionStore } from "../../store";
import {
  addPositionService,
  editPositionService,
  deletePositionService,
} from "@/api/position";
import { useDepartmentStore } from "../../store";

const departmentStore = useDepartmentStore();

const positionStore = usePositionStore();

const hoverDepartment = ref(null);

const hoverPosition = ref(null);

const isDrawerVisible = ref(false);

const editFormData = ref({
  belong_to: "",
  positionName: "",
  requirement: "",
  deliveryEmail: "",
});

onMounted(async () => {
  await departmentStore.getDepart();
  await positionStore.getPosition();
});

const departments = computed(() => departmentStore.departments);
const positions = computed(() => positionStore.positions);
// 编辑岗位
const editPosition = async (ID) => {};

// 删除岗位
const deletePosition = async (ID) => {
  try {
    await ElMessageBox.confirm("确定删除该岗位吗？", "提示", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
    });
    await deletePositionService(ID);
    await positionStore.getPosition(); // 刷新数据
    ElMessage.success("删除成功");
  } catch (error) {
    if (error !== "cancel") {
      ElMessage.error("删除失败");
    }
  }
};

// 新增岗位
const addPosition = async () => {
  try {
    console.log("add...");
  } catch {}
};

// 提交表单
const handleConfirm = async () => {};

// 处理 折叠展开 或 添加 逻辑
const handleDepartmentAction = () => {};

defineProps({
  activeButton: String,
});
</script>

<template>
  <el-card v-if="activeButton === 'positionRecruit'">
    <!-- 滚动区域 -->
    <el-scrollbar height="calc(100vh - 150px)" always>
      <div class="scroll-content">
        <div v-for="department in departments" :key="department.ID">
          <!-- 部门信息 -->
          <div class="depart-header">
            <span>{{ department.departName }}</span>
            <el-button
              type="primary"
              color="#fff"
              :icon="Plus"
              circle
              @click="handleDepartmentAction(department.ID)"
            ></el-button>
          </div>

          <!-- 岗位内容 -->
          <el-collapse-transition>
            <div v-if="positions" class="sub-jobs">
              <div
                v-for="position in positions"
                :key="position.ID"
                class="job-item"
              >
                <span>{{
                  position.belong_to === department.departName
                    ? position.positionName
                    : ""
                }}</span>
                <div class="actions">
                  <el-button
                    type="primary"
                    icon="edit"
                    color="#fff"
                    circle
                    @click="editPosition(position.ID)"
                  ></el-button>
                  <el-button
                    type="danger"
                    icon="delete"
                    circle
                    @click="deletePosition(position.ID)"
                  ></el-button>
                </div>
              </div>
            </div>
          </el-collapse-transition>
        </div>
      </div>
    </el-scrollbar>

    <!-- 编辑抽屉 -->
    <el-drawer
      v-model="isDrawerVisible"
      :size="'30%'"
      direction="rtl"
      :with-header="false"
      :show-close="false"
    >
      <el-form :model="editFormData" label-width="80px">
        <el-form-item label="岗位名称" label-position="top">
          <el-input
            v-model="editFormData.positionName"
            placeholder="请输入岗位名称"
          ></el-input>
        </el-form-item>

        <el-form-item label="岗位要求" label-position="top">
          <el-input
            type="textarea"
            :rows="10"
            v-model="editFormData.requirement"
          ></el-input>
        </el-form-item>

        <el-form-item label="简历投递" label-position="top">
          <el-input
            v-model="editFormData.email"
            placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="confirm-button">
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </div>
    </el-drawer>
  </el-card>
</template>

<style scoped>
.el-card {
  height: auto;
  min-height: 100vh;
}

.scroll-content {
  padding: 16px;
}

.depart-header {
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

  &:hover {
    background-color: #ccc;
    color: #111;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }

  .el-button {
    border: none;
    font-size: 30px;
    background-color: transparent;
    transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
      color 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  }

  &:hover .el-button {
    background-color: inherit !important;
    --el-button-hover-bg-color: inherit;
  }
}

/* 子岗位列表 */
.sub-jobs {
  overflow: hidden;
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

  &:hover {
    background-color: #ddd;
    color: #222;
  }
}

.actions {
  display: flex;
}

.confirm-button {
  display: flex;
  justify-content: flex-end;
}

:deep(.el-form-item__label) {
  font-size: 18px;
  font-weight: 600;
}

:deep(.el-scrollbar) {
  height: calc(100vh - 150px);
}
</style>