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
        <img v-for="post in props.posts" :key="post.id" :src="'https://awzcvlthbswhzjyewrrr.supabase.co/storage/v1/object/public/InstaBuck/' + post.url"/>
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
