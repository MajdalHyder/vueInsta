<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
    posts: {
        type: Object,
        required: true,
    },
});

const envs = import.meta.env;
</script>
<template>
    <div class="image-gallery-cotainer">
        <img v-for="post in props.posts" :key="post.id" :src="`${envs.VITE_IMAGE_PATH}${post.url}`"/>
    </div>
</template>

<style scoped>
.image-gallery-cotainer {
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
}

img {
    margin: 5px;
    width: 200px;
    border-radius: 8px;
    object-fit: cover;
}
</style>
