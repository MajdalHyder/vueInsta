<script setup lang="ts">
import Card from './Card.vue';
import { defineProps } from 'vue';

const props = defineProps({
    timelinePosts: {
        type: Array,
        required: true,
    }
})
</script>

<template>
    <div class="timeline-container">
        <Card v-for="post in props.timelinePosts" 
        :key="post.id" 
        :id="post.id" 
        :url="post.url" 
        :username="post.username"
        :caption="post.caption" />
    </div>
</template>

<style scoped>
.timeline-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
}
</style>