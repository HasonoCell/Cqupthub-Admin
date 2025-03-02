<template>
  <svg
    :class="customClass"
    :style="{ width: size, height: size, color }"
    aria-hidden="true"
  >
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  name: { type: String, required: true }, // 传入的 icon 名称
  size: { type: String, default: "20px" }, // 图标大小
  color: { type: String, default: "blue" }, // 默认颜色
  customClass: { type: String, default: "" },
});

const iconName = computed(() => `#icon-${props.name}`);
console.log(iconName.value);
</script>

<style scoped>
svg {
  vertical-align: middle;
  fill: currentColor;
}
</style>
