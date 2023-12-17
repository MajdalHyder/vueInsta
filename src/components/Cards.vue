<script setup lang="ts">
import Card from './Card.vue';
import { defineProps, type PropType } from 'vue';
import Observer from './Observer.vue';

interface Posts {
    id: string | number;
    url: string;
    username: string;
    caption: string;

}

const props = defineProps({
    timelinePosts: {
        type: Object as PropType<Posts>,
        required: true,
    }
})

const fetchNextSet = () => {
    console.log('fetching next set');
}
</script>

<template>
    <div class="timeline-container">
        <Card v-for="post in props.timelinePosts" 
        :key="post.id" 
        :id="post.id" 
        :url="post.url" 
        :username="post.username"
        :caption="post.caption" />
        <Observer @intersect="fetchNextSet" />
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