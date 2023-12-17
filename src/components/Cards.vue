<script setup lang="ts">
import Card from './Card.vue';
import { defineProps, type PropType } from 'vue';
import Observer from './Observer.vue';
import { supabase } from '../supabase';
import { onMounted, ref } from 'vue';
import useUserStore from '../stores/users';
import { storeToRefs } from 'pinia';

interface Posts {
    id: string | number;
    url: string;
    username: string;
    caption: string;
    
}

    
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const posts  = ref<any[]>([]);

const fetchdata = async () => {
    const { data: following } = await supabase
        .from('followers_following')
        .select('user:users!followers_following_following_id_fkey(id,username)')
        .eq('follower_id', user?.value?.id)
    if (!following) return;

    const { data: dbPosts } = await supabase
        .from('posts')
        .select()
        .in('owner_id', following.map(f => {

            return f.user.id
        }))
        .order('created_at', { ascending: false });
    if (dbPosts) {
        posts.value = dbPosts?.map(post => {
            let user = following.find(follow => follow.user.id === post.owner_id)
            return { ...post, username: user?.user?.username }
        })
    }
}

onMounted(() => {
    fetchdata();
})
const fetchNextSet = () => {
    console.log('fetching next set');
}
</script>

<template>
    <div class="timeline-container">
        <Card v-for="post in posts" 
        :key="post.id" 
        :id="post.id" 
        :url="post.url" 
        :username="post.username"
        :caption="post.caption" />
        <Observer v-if="posts.length" @intersect="fetchNextSet" />
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