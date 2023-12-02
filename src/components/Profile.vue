<script setup lang="ts">
import Container from './Container.vue';
import UserBar from './UserBar.vue';
import ImageGallery from './ImageGallery.vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { supabase } from '@/supabase';

const route = useRoute();
const user = ref(null);
const { username } = route.params;
const posts = ref<any[]>([]);
const loading = ref(false);


const addNewPost = (post) => {
    posts.value.unshift(post)
}

const fetchata = async () => {
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

    const { data: postsData } = await supabase
        .from('posts')
        .select()
        .eq('owner_id', userData.id)
        .order('created_at', { ascending: false });
        
    if (postsData) posts.value = postsData;
    loading.value = false;
}

onMounted(() => {
    fetchata();
})

</script>
<template>
    <Container>
        <div class="profile-container" v-if="!loading">
            <UserBar :addNewPost="addNewPost" :key="$route?.params?.username" username="Majd"
                :userInfo="{ posts: 4, followers: 200, follwing: 400 }" />
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