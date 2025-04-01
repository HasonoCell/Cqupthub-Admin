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
  name: { type: String, required: true },
  size: { type: String, default: "20px" },
  color: { type: String, default: "blue" },
  customClass: { type: String, default: "" },
});

const iconName = computed(() => `#icon-${props.name}`);
</script>

<style scoped>
svg {
  vertical-align: middle;
  fill: currentColor;
}
</style>
