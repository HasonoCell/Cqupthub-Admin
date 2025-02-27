<template>
  <el-card width="100%">
    <template #header>
        <div class="card-header">
            <span><slot name="header"></slot></span>
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
  }

.card-footer {
    display: flex;
    justify-content: end;
}
</style>