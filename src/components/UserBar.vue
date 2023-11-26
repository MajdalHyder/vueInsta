<script setup lang="ts">
import type { Upload } from 'ant-design-vue';
import { defineProps } from 'vue';
import UploadPhotoModal from './UploadPhotoModal.vue';

const props = defineProps({
    username: {
        type: String,
        required: true,
    },
    userInfo: {
        type: Object,
        required: true,
    }
})
</script>
<template>
    <div class="userbar-container">
        <div class="top-content">
            <ATypographyTitle :level="2">{{ props.username }}</ATypographyTitle>
            <UploadPhotoModal />
        </div>
        <div class="bottom-content">
            <ATypographyTitle :level="5">{{ props.userInfo.posts }} Posts</ATypographyTitle>
            <ATypographyTitle :level="5">{{ props.userInfo.followers }} Followers</ATypographyTitle>
            <ATypographyTitle :level="5">{{ props.userInfo.following }}  Follwing</ATypographyTitle>
        </div>
    </div>
</template>

<style scoped>
h5, h2{
    color: rgb(255, 255, 255);
}
.top-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}
.userbar-container {
    display: flex;
    flex-direction: column;
    padding-bottom: 75px;
}

.bottom-content {
    display: flex;
    align-items: center;
}

.bottom-content h5 {
    margin: 0;
    padding: 0;
    margin-right: 30px;
}
</style>