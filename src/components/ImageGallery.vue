<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
    posts: {
        type: Object,
        required: true,
    },
});

</script>
<template>
    <div class="image-gallery-cotainer">
        <img v-for="post in props.posts" :key="post.id" :src="post.image"/>
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
}
</style>
