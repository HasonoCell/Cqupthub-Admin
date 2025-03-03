<template>
  <el-card style="height: 100%;" shadow="never">
    <template #header>
        <div class="card-header">
            <slot name="header"></slot>
        </div>
    </template>
    <div class="card-main">
        <slot></slot>    
    </div>
    <template #footer>
        <div class="card-footer">
            <slot name="footer"></slot>
        </div>
    </template>
  </el-card>
</template>

<style scoped lang="scss">
.card-header {
    font-weight: 600;
    display: flex;
    justify-content: space-between;
  }

.card-footer {
    display: flex;
    justify-content: end;
}
:deep(.el-card__header) {
    border-bottom: none
}
:deep(.el-card__footer) {
    border-top: none;
}
</style>