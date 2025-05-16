<script setup>
import { useRouter } from "vue-router";
import { computed } from "vue";
import SvgIcon from "@/components/SvgIcon/index.vue";

const router = useRouter();

const menuRoutes = computed(() => {
  const layoutRoute = router.options.routes.find((r) => r.name === "layout");
  return layoutRoute?.children?.filter((route) => route.meta?.showInMenu) || [];
});
</script>

<template>
  <div class="sidebar-container">
    <div class="logo-wrapper">
      <img src="@/assets/sidebar-logo.png" alt="Logo" />
    </div>

    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical"
      background-color="#fff"
      text-color="#333"
      active-text-color="#fff"
      router
    >
      <el-menu-item
        v-for="route in menuRoutes"
        :key="route.path"
        :index="route.path"
      >
        <SvgIcon
          v-if="route.meta?.icon"
          :name="route.meta.icon"
          size="22px"
          :color="$route.path === route.path ? '#FFFFFF' : '#4B5563'"
        />
        <template #title>
          <span>{{ route.meta.title }}</span>
        </template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style scoped lang="scss">
.sidebar-container {
  height: 100vh;
  overflow: hidden;
}

.logo-wrapper {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  img {
    height: 80px;
    width: 80px;
  }
}

.el-menu {
  border-right: none;
}

.el-menu-item {
  height: 56px;
  line-height: 56px;
  font-size: 14px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s ease;
  display: flex;
  gap: 10px;

  &:hover {
    background-color: #858484;
    color: #ffffff;
  }
}

.el-menu-item.is-active {
  background-color: #000000;
}
</style>
