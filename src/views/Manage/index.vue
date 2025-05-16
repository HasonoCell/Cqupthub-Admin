<script setup>
import PageCard from "../../components/PageCard/index.vue";
import { ref } from "vue";
import { useDraggableItem } from "../../utils/drag";

const testData = ref([
  { id: 1, name: "1" },
  { id: 2, name: "2" },
  { id: 3, name: "3" },
  { id: 4, name: "4" },
]);

const listRef = ref();
const { handleDragStart, handleDragEnter, handleDragEnd } =
  useDraggableItem(listRef);

const handleAdd = () => {
  console.log("add");
};

const handleEdit = () => {
  console.log("edit");
};

const handleDelete = () => {
  console.log("delete");
};
</script>

<template>
  <div class="header">
    <el-button color="#000" @click="handleAdd">新增</el-button>
  </div>
  <PageCard>
    <div class="main-list" ref="listRef">
      <div v-for="data in testData" :key="data.id" class="list-item">
        <div class="list-item-text">
          <el-icon
            size="24px"
            draggable="true"
            @dragstart="handleDragStart"
            @dragenter.prevent="handleDragEnter"
            @dragend.prevent="handleDragEnd"
            ><Rank
          /></el-icon>
          <div class="text">{{ data.name }}</div>
        </div>
        <div class="list-item-actions">
          <el-button
            type="primary"
            icon="edit"
            circle
            color="#fff"
            style="border-color: black"
            @click="handleEdit"
          />
          <el-button type="danger" icon="delete" circle @click="handleDelete" />
        </div>
      </div>
    </div>
  </PageCard>
</template>

<style scoped>
.header {
  box-sizing: border-box;
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.main-list {
  overflow: hidden;
  padding-left: 20px;
}

.list-item {
  min-width: 300px;
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
  transition: transform 0.3s ease-in-out;

  &:hover {
    background-color: #ccc;
    color: #111;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }
}

.list-item-text {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .text {
    margin-left: 20px;
  }
}

.list-item-actions {
  display: flex;
}

.list-item.moving {
  background: transparent;
  color: transparent;
  border: 2px dashed #ccc;
}
</style>
