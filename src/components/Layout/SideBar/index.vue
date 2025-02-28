<template>
  <div class="sidebar-container">
    <div class="logo-wrapper">
      <img src="@/assets/sidebar-logo.png" alt="Logo" />
    </div>

    <el-menu
      :default-active="$route.path"
      background-color="#fff"
      text-color="#4B5563"
      active-text-color="#fff"
      router
    >
      <el-menu-item
        v-for="route in menuRoutes"
        :key="route.path"
        :index="route.path"
      >
        <el-icon>
          <component :is="route.meta.icon" />
        </el-icon>
        <template #title>
          <span>{{ route.meta.title }}</span>
        </template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { computed } from "vue";

defineProps({
  isCollapse: Boolean,
});

const router = useRouter();

const menuRoutes = computed(() => {
  const layoutRoute = router.options.routes.find(r => r.name === 'layout');
  return layoutRoute?.children?.filter(route => route.meta?.showInMenu) || [];
});
</script>

<style scoped>
.sidebar-container {
  height: 100%;
  overflow: hidden;
}

.logo-wrapper {
  width: 100%;
  height: 81px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    height: 81px;
    width: 81px;
  }
}

.el-menu {
  border-right: none;
}

.el-menu-item {
  height: 56px;
  line-height: 56px;
  font-size: 14px;
  transition: 
    background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.2s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1) !important;
    transition-delay: 0.05s;
  }

  .el-icon {
    margin-right: 8px;
    font-size: 18px;
  }
}

.el-menu-item.is-active {
  background-color: #000 !important;
  position: relative;
}
</style>