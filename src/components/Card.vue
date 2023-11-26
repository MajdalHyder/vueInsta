<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    required: true
  }
});
</script>

<template>
    <ACard hoverable style="width: 240px" class="card">
      <template #cover>
        <img :alt="props.username" :src="props.url" />
      </template>
      <ACardMeta :title="props.username">
        <template #description>{{ props.caption }}</template>
      </ACardMeta>
    </ACard>
  </template>

  <style scoped>
  .card {
    margin-bottom: 20px;
  }
</style>