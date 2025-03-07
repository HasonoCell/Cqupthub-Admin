<script setup>
import PageCard from "@/components/PageCard/index.vue";

defineProps({
  activeButton: String,
});
</script>

<template>
  <PageCard v-if="activeButton === 'game'">
    <template #header>严肃游戏展示</template>
    <template #default> Show Game </template>
  </PageCard>
</template>
