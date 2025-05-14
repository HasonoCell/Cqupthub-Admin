<script setup>
import PageCard from "@/components/PageCard/index.vue";
import { computed, ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { useGameStore } from "../../store";
import {
  editGameService,
  addGameService,
  deleteGameService,
  showGameService,
} from "../../api/game";

defineProps({
  activeButton: String,
});

const editFormData = ref({
  gameName: "",
  gamePath: "",
  gameImage: "",
  previewImage: "",
});

const rules = {
  gameName: [
    { required: true, message: "请输入游戏名称", trigger: "blur" },
    {
      min: 3,
      message: "游戏名称必须包含至少3位的字符",
      trigger: "blur",
    },
  ],
  gamePath: [{ required: true, message: "请输入游戏地址", trigger: "blur" }],
};

const gameStore = useGameStore();
const scrollContainer = ref(null);
const isDrawerVisible = ref(false);
const isEdit = ref(false);
const isSave = ref(false);
const formRef = ref();
const currentId = ref();
const selectedGamesID = ref([]);

const allGames = computed(() => gameStore.games);
const displayedGames = computed(() => {
  return allGames.value.filter((game) => game.isDisplay === true);
});
const displayedGamesID = computed(() => {
  return displayedGames.value.map((game) => game.ID);
});

const changeGame = async () => {
  if (isSave.value) {
    try {
      await showGameService(selectedGamesID.value);
      await gameStore.getGame();
      isSave.value = false;
      selectedGamesID.value = [];
      ElMessage.success("展示游戏更新成功");
      await nextTick(() => {
        scrollContainer.value?.update();
      });
    } catch (error) {
      selectedGamesID.value = [];
      ElMessage.error("更新失败");
      isSave.value = true;
    }
  } else {
    selectedGamesID.value = [...displayedGamesID.value];
    isSave.value = true;
    ElMessage.warning("请选择需要展示的游戏");
  }
};

const selectGame = (gameId) => {
  if (!isSave.value) return;

  const selected = new Set(selectedGamesID.value);
  selected.has(gameId) ? selected.delete(gameId) : selected.add(gameId);
  selectedGamesID.value = Array.from(selected);
};

const deleteGame = async (ID) => {
  try {
    await ElMessageBox.confirm("确定删除该游戏吗？", "警告", {
      type: "warning",
      confirmButtonText: "确定",
      cancelButtonText: "取消",
    });
    await deleteGameService(ID);
    await gameStore.getGame();
    ElMessage.success("删除成功");
  } catch (error) {
    ElMessage.error("删除失败: " + error.message);
  }
};

const editGame = (ID, game) => {
  isEdit.value = true;
  currentId.value = ID;
  isDrawerVisible.value = true;

  editFormData.value = {
    gameName: game.gameName,
    gamePath: game.gamePath,
    gameImage: game.gameImage,
  };
};

const editGameSubmit = async () => {
  try {
    await formRef.value.validate();
    ElMessage.warning("上传中，请耐心等待");
    const formData = new FormData();
    formData.append("gameName", editFormData.value.gameName);
    formData.append("gamePath", editFormData.value.gamePath);
    // get时图片字段为gameImage，post时图片字段为image
    formData.append("image", editFormData.value.gameImage);
    await editGameService(currentId.value, formData);
    await gameStore.getGame();
    ElMessage.success("修改成功");
    isDrawerVisible.value = false;
    formRef.value.resetFields();
  } catch (error) {
    ElMessage.error("修改失败");
  }
};

const addGame = () => {
  isEdit.value = false;
  isDrawerVisible.value = true;
  formRef.value?.resetFields();

  editFormData.value = {
    gameName: "",
    gamePath: "",
    gameImage: "",
  };
};

const addGameSubmit = async () => {
  try {
    await formRef.value.validate();
    ElMessage.warning("上传中，请耐心等待");
    const formData = new FormData();
    formData.append("gameName", editFormData.value.gameName);
    formData.append("gamePath", editFormData.value.gamePath);
    // get时图片字段为gameImage，post时图片字段为image
    formData.append("image", editFormData.value.gameImage);
    await addGameService(formData);
    await gameStore.getGame();
    ElMessage.success("添加成功");
    isDrawerVisible.value = false;
    formRef.value.resetFields();
  } catch (error) {
    ElMessage.error("添加失败");
  }
};

const onUploadFile = (file) => {
  const previewURL = URL.createObjectURL(file.raw);
  editFormData.value.gameImage = file.raw;
  editFormData.value.previewImage = previewURL;
};

onMounted(async () => {
  await gameStore.getGame();
});

onBeforeUnmount(() => {
  if (editFormData.value.previewImage) {
    URL.revokeObjectURL(editFormData.value.previewImage);
  }
});
</script>

<template>
  <PageCard v-if="activeButton === 'game'">
    <template #header>
      <div>严肃游戏展示</div>
      <el-button color="#000" @click="changeGame">{{
        isSave ? "保存" : "更改"
      }}</el-button>
    </template>

    <template #default>
      <!-- 严肃游戏展示 -->
      <div class="displayed-game">
        <el-scrollbar ref="scrollContainer">
          <el-row :gutter="30" class="card-container">
            <el-col
              v-for="game in displayedGames"
              :xs="24"
              :sm="12"
              :md="8"
              :lg="6"
              class="card-column"
            >
              <el-card class="game-card">
                <div class="game-image">
                  <img
                    :src="'http://' + game.gameImage"
                    alt="图片加载失败"
                    v-if="game.gameImage"
                  />
                  <div v-else class="image-placeholder"></div>
                </div>
                <p class="game-name">{{ game.gameName }}</p>
                <p class="game-address">{{ game.gamePath }}</p>
                <div class="actions">
                  <el-tag
                    type="primary"
                    class="action-tag"
                    @click="editGame(game.ID, game)"
                    >编辑</el-tag
                  >
                  <el-tag
                    type="danger"
                    class="action-tag"
                    @click="deleteGame(game.ID)"
                    >删除</el-tag
                  >
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-scrollbar>
      </div>

      <!-- 严肃游戏库 -->
      <div class="all-game">
        <div class="all-game-header">
          <p>严肃游戏库</p>
          <el-button class="custom-add-button" :icon="Plus" @click="addGame">
            添加游戏
          </el-button>
        </div>

        <div class="all-game-main">
          <el-row :gutter="30" class="card-container">
            <el-col
              v-for="game in allGames"
              :xs="24"
              :sm="12"
              :md="8"
              :lg="6"
              class="card-column"
            >
              <el-card
                class="game-card"
                :class="{
                  'selected-card': selectedGamesID.includes(game.ID),
                  'cursor-mode': isSave,
                }"
                @click="selectGame(game.ID)"
              >
                <div class="game-image">
                  <img
                    :src="'http://' + game.gameImage"
                    alt="图片加载失败"
                    v-if="game.gameImage"
                  />
                  <div v-else class="image-placeholder"></div>
                </div>
                <p class="game-name">{{ game.gameName }}</p>
                <p class="game-address">{{ game.gamePath }}</p>
                <div class="actions">
                  <el-tag
                    type="primary"
                    class="action-tag"
                    @click="editGame(game.ID, game)"
                    >编辑</el-tag
                  >
                  <el-tag
                    type="danger"
                    class="action-tag"
                    @click="deleteGame(game.ID)"
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
                  'http://' + editFormData.gameImage
                "
              />
              <el-upload
                :auto-upload="false"
                :show-file-list="false"
                :on-change="onUploadFile"
              >
                <el-button color="#000" type="primary" label-position="top"
                  >更换</el-button
                >
              </el-upload>
            </div>
          </el-form-item>

          <el-form-item label="游戏标题:" label-position="top" prop="gameName">
            <el-input v-model="editFormData.gameName" />
          </el-form-item>

          <el-form-item label="游戏地址:" label-position="top" prop="gamePath">
            <el-input v-model="editFormData.gamePath" />
          </el-form-item>
          <div class="confirm-button">
            <el-button
              color="#000"
              type="primary"
              @click="isEdit ? editGameSubmit() : addGameSubmit()"
              >确定</el-button
            >
          </div>
        </el-form>
      </el-drawer>
    </template>
  </PageCard>
</template>

<style scoped>
.displayed-game {
  .card-container {
    display: flex;
    flex-wrap: nowrap;
  }
  margin-bottom: 20px;
}

.all-game {
  .card-container {
    display: flex;
    flex-wrap: wrap;
  }
}

.card-column {
  margin-bottom: 20px;
}

.game-card {
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

.game-image {
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

.game-name {
  font-size: 16px;
  line-height: 24px;
}

.game-address {
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

.all-game-header {
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
