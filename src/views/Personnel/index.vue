<script setup>
import PageCard from "@/components/PageCard/index.vue";
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";

const personList = ref([
  {
    id: 1,
    name: "张总经理",
    title: "CEO",
    avatar:
      "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544a1342f06ccbjpeg.jpeg",
  },
  {
    id: 2,
    name: "李经理",
    title: "销售总监",
    avatar:
      "https://fuss10.elemecdn.com/d/e6/c4d94ed0c153337756179a3a8495fjpeg.jpeg",
  },
  {
    id: 3,
    name: "王工程师",
    title: "技术总监",
    avatar:
      "https://fuss10.elemecdn.com/8/27/f01c15bb749e526d5c6974a8f3e54jpeg.jpeg",
  },
]);

const editPerson = (person) => {
  ElMessage(`编辑 ${person.name}`);
};

const deletePerson = (person) => {
  ElMessage.error(`删除 ${person.name}`);
};

const addPerson = () => {
  ElMessage.success("添加人员");
};
</script>

<template>
  <PageCard>
    <template #header>人员管理</template>
    <template #default>
      <el-row :gutter="20">
        <el-col :span="6" v-for="person in personList" :key="person.id">
          <el-card shadow="hover" class="person-card">
            <el-avatar
              :size="80"
              :src="person.avatar"
              class="person-avatar"
            ></el-avatar>
            <h4>{{ person.name }}</h4>
            <p class="sub-title">{{ person.title }}</p>
            <div>
              <el-tag type="primary" @click="editPerson(person)">编辑</el-tag>
              <el-tag type="danger" @click="deletePerson(person)">删除</el-tag>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover" class="add-card">
            <el-button type="primary" @click="addPerson">
              <el-icon>
                <Plus />
              </el-icon>
              添加成员
            </el-button>
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
.person-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
}

.person-avatar {
  margin-bottom: 10px;
}

.sub-title {
  color: #999;
  font-size: 14px;
}

.el-tag {
  margin-right: 5px;
  cursor: pointer;
}

.add-card {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
