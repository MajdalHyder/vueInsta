<script setup lang="ts">
import Container from './Container.vue';
import UserBar from './UserBar.vue';
import ImageGallery from './ImageGallery.vue';
import { onMounted, ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { supabase } from '../supabase';
import useUserStore from '../stores/users';
import { storeToRefs } from 'pinia';

const route = useRoute();
const userStore = useUserStore();
const { user: loggedInUser } = storeToRefs(userStore);
const user = ref(null);
const { username } = route.params;
const posts = ref<any[]>([]);
const profileStats = reactive({
    posts: 0,
    followers: 0,
    following: 0,
});
const loading = ref(false);
const isFollowing = ref(false);


const fetchIsFollowing = async () => {
    console.log(loggedInUser.value);
    if (loggedInUser?.value && loggedInUser?.value?.id !== user?.value?.id) {
        const { data } = await supabase
            .from('followers_following')
            .select()
            .eq('follower_id', loggedInUser?.value?.id)
            .eq('following_id', user?.value?.id)
            .single();    
        if (data) isFollowing.value = true;
    }
}

const addNewPost = (post) => {
    posts.value.unshift(post)
}

const fetchdata = async () => {
    loading.value = true;
    const { data: userData } = await supabase
        .from('users')
        .select()
        .eq('username', username)
        .single();

    if (!userData) {
        loading.value = false;
        return user.value = null;
    }

    user.value = userData;

    const { data: postsData } = await supabase
        .from('posts')
        .select()
        .eq('owner_id', userData.id)
        .order('created_at', { ascending: false });
        
    if (postsData) {
        posts.value = postsData;
        profileStats.posts = postsData.length;
    }

    const { count: followersData } = await supabase
        .from('followers_following')
        .select('*', { count: 'exact' })
        .eq('following_id', userData.id);
    if (followersData) profileStats.followers = followersData;

    const { count: followingData } = await supabase
        .from('followers_following')
        .select('*', { count: 'exact' })
        .eq('follower_id', userData.id);
    if (followingData) profileStats.following = followingData;

    await fetchIsFollowing();
    loading.value = false;
}


onMounted(() => {
    fetchdata();
    fetchIsFollowing();
})

</script>
<template>
    <Container>
        <div class="profile-container" v-if="!loading">
            <UserBar :isFollowing="isFollowing" :addNewPost="addNewPost" :key="($route?.params?.username as string | number | symbol | undefined)" :username="$route?.params?.username"
                :userInfo="{ posts: profileStats.posts, followers: profileStats.followers, following: profileStats.following }" />
            <ImageGallery :posts="posts" />
        </div>
        <div class="spinner" v-else>
            <ASpin />
        </div>
    </Container>
</template>

<style scoped>
.spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
.profile-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px 0;
}
</style>