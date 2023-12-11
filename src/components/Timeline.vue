<script setup lang="ts">
import Container from './Container.vue';
import Card from './Card.vue';
import useUserStore from '../stores/users';
import { storeToRefs } from 'pinia';
import { supabase } from '../supabase';
import { onMounted, ref } from 'vue';

const userStore = useUserStore();
const timelinePosts = ref<any[]>([]);
const { user, loadingUser } = storeToRefs(userStore);



const fetchdata = async () => {
    const { data: following } = await supabase
        .from('followers_following')
        .select('following_id')
        .eq('follower_id', 9);
    if (!following) return;
    
    const { data: posts } = await supabase
        .from('posts')
        .select()
        .in('owner_id', following.map((f) => f.following_id));
    if (posts) timelinePosts.value = posts;
}

onMounted(() => {
    setTimeout(() => {
        fetchdata();
    }, 2000);
})

</script>
<template>
    <Container>
        <div v-if="!loadingUser">
            <div v-if="user" class="timeline-container">
                <Card v-for="post in timelinePosts" 
                :key="post.id" 
                :id="post.id" 
                :url="post.url" 
                :username="post.username"
                :caption="post.caption" />
            </div>
            <div v-else class="timeline-container">
                <h1>Log In Please! </h1>
            </div>
        </div>
        <div v-else class="spinner">
            <ASpin/>
        </div>
    </Container>
</template>

<style scoped>
.spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
}
.timeline-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
}
</style>