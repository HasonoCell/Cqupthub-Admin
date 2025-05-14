<script setup>
import PageCard from "../PageCard/index.vue";
import { ref, onMounted, computed } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { usePositionStore } from "../../store";
import {
  addPositionService,
  editPositionService,
  deletePositionService,
} from "../../api/position";
import { useDepartmentStore } from "../../store";

defineProps({
  activeButton: String,
});

const departmentStore = useDepartmentStore();
const positionStore = usePositionStore();
const isDrawerVisible = ref(false);
const isEdit = ref(false);
const currentID = ref(null);
const formRef = ref();
const editFormData = ref({
  belong_to: "",
  positionName: "",
  requirement: "",
  deliveryEmail: "",
});

const departments = computed(() => departmentStore.departments);
const positions = computed(() => positionStore.positions);

const rules = {
  positionName: [
    { required: true, message: "请输入岗位名称", trigger: "blur" },
    {
      min: 2,
      max: 10,
      message: "部门名称必须包含2-10位的字符",
      trigger: "blur",
    },
  ],
  requirement: [{ required: true, message: "请输入需求", trigger: "blur" }],
};

// 删除岗位
const deletePosition = async (ID) => {
  try {
    await ElMessageBox.confirm("确定删除该岗位吗？", "提示", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
    });
    await deletePositionService(ID);
    await positionStore.getPosition();
    ElMessage.success("删除成功");
  } catch (error) {
    if (error !== "cancel") {
      ElMessage.error("删除失败");
    }
  }
};

const editPosition = (position) => {
  isEdit.value = true;
  isDrawerVisible.value = true;
  currentID.value = position.ID;

  editFormData.value = {
    belong_to: position.belong_to,
    positionName: position.positionName,
    requirement: position.requirement,
    deliveryEmail: position.deliveryEmail,
  };
};

const editPositionSubmit = async () => {
  try {
    await formRef.value.validate();
    await editPositionService(currentID.value, editFormData.value);
    await positionStore.getPosition();
    ElMessage.success("修改成功");
    isDrawerVisible.value = false;
    formRef.value.resetFields();
  } catch (error) {
    ElMessage.error("修改失败");
  }
};

const addPosition = (departName) => {
  isEdit.value = false;
  isDrawerVisible.value = true;
  formRef.value?.resetFields();

  editFormData.value = {
    belong_to: departName,
    positionName: "",
    requirement: "",
    deliveryEmail: "",
  };
};

const addPositionSubmit = async () => {
  try {
    await formRef.value.validate();
    editFormData.value.belong_to = await addPositionService(editFormData.value);
    await positionStore.getPosition();
    ElMessage.success("新增成功");
    isDrawerVisible.value = false;
    formRef.value.resetFields();
  } catch (error) {
    ElMessage.error("新增失败");
  }
};

onMounted(async () => {
  await departmentStore.getDepart();
  await positionStore.getPosition();
});
</script>

<template>
  <PageCard v-if="activeButton === 'positionRecruit'">
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
            @click="addPosition(department.departName)"
          ></el-button>
        </div>

        <!-- 岗位内容 -->

        <div v-for="position in positions" :key="position.ID" class="sub-jobs">
          <div
            v-if="position.belong_to === department.departName"
            class="job-item"
          >
            <span>{{ position.positionName }}</span>
            <div class="actions">
              <el-button
                type="primary"
                icon="edit"
                color="#fff"
                circle
                @click="editPosition(position)"
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
      </div>
    </div>

    <!-- 编辑抽屉 -->
    <el-drawer
      v-model="isDrawerVisible"
      :size="'30%'"
      direction="rtl"
      :with-header="false"
      :show-close="false"
    >
      <el-form
        :model="editFormData"
        :rules="rules"
        ref="formRef"
        label-width="80px"
      >
        <el-form-item label="岗位名称" label-position="top" prop="positionName">
          <el-input
            v-model="editFormData.positionName"
            placeholder="请输入岗位名称"
          ></el-input>
        </el-form-item>

        <el-form-item label="岗位要求" label-position="top" prop="requirement">
          <el-input
            type="textarea"
            :rows="10"
            v-model="editFormData.requirement"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="简历投递"
          label-position="top"
          prop="deliveryEmail"
        >
          <el-input
            v-model="editFormData.deliveryEmail"
            placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="confirm-button">
        <el-button
          type="primary"
          @click="isEdit ? editPositionSubmit() : addPositionSubmit()"
          >确定</el-button
        >
      </div>
    </el-drawer>
  </PageCard>
</template>

<style scoped>
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
