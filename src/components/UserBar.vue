<script setup lang="ts">
import { defineProps, ref, onMounted } from 'vue';
import UploadPhotoModal from './UploadPhotoModal.vue';
import { supabase } from '../supabase';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import useUserStore from '../stores/users';



const props = defineProps({
    username: {
        type: [String, Array<String>],
        required: true,
    },
    userInfo: {
        type: Object,
        required: true,
    },
    addNewPost: {
        required: true,
    },
    isFollowing: {
        type: Boolean<() => Boolean>,
        required: true,
    }
})
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const route = useRoute();
const { username : profileUsername } = route.params;


const followUser = async () => {
    const { data: currentProfileId } = await supabase.from('users').select('id').eq('username', props.username).single();
    if (!currentProfileId) return;
    
    const { error } = await supabase.from('followers_following').insert([
        {
            follower_id: user?.value?.id,
            following_id: currentProfileId.id,
        }
    ])
    if (error) return console.log(error);
}

const unfollowUser = async () => {
    const { data: currentProfileId } = await supabase.from('users').select('id').eq('username', props.username).single();
    if (!currentProfileId) return;

    const { error } = await supabase.from('followers_following').delete().eq('follower_id', user?.value?.id).eq('following_id', currentProfileId.id);
    if (error) return console.log(error);
}

</script>
<template>
    <div class="userbar-container">
        <div class="top-content">
            <ATypographyTitle :level="2">{{ props.username }}</ATypographyTitle>
            <div v-if="user">
                <UploadPhotoModal :addNewPost="addNewPost" v-if="user && profileUsername === user.username"/>
                <div v-else>
                    <AButton v-if="props.isFollowing" @click="unfollowUser">Following</AButton>
                    <AButton v-else @click="followUser">Follow</AButton>
                </div>
            </div>
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