<script setup lang="ts">
import Card from './Card.vue';
import Observer from './Observer.vue';
import { supabase } from '../supabase';
import { onMounted, ref } from 'vue';
import useUserStore from '../stores/users';
import { storeToRefs } from 'pinia';
import type { PostgrestSingleResponse } from '@supabase/supabase-js';

interface Posts {
    id: string | number;
    url: string;
    username: string;
    caption: string;

}
interface User {
    id: number;
    username: string;

}

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const posts = ref<any[]>([]);
const lastCardIndex = ref<number>(2);
const ownerIds = ref<number[]>([]);
const reachedEnd = ref<boolean>(false);


const fetchdata = async () => {
    const { data: following }: PostgrestSingleResponse<{ user: { id: number; username: string; }[]; }[]> = await supabase
        .from('followers_following')
        .select('user:users!followers_following_following_id_fkey(id,username)')
        .eq('follower_id', user?.value?.id);
    if (!following) return;

    ownerIds.value = following.flatMap(f => f.user.map((user) => user.id));

    const { data: dbPosts } = await supabase
        .from('posts')
        .select()
        .in('owner_id', ownerIds.value)
        .range(0, lastCardIndex.value)
        .order('created_at', { ascending: false });
    if (dbPosts) {
        const users = following.flatMap(f => f.user);
        posts.value = dbPosts?.map(post => {
            let user = users.find(user => user.id === post.owner_id)
            return { ...post, username: user?.username }
        })
    }
}

onMounted(() => {
    fetchdata();
})
const fetchNextSet = async () => {
    if (reachedEnd.value) return;
    const { data: following } = await supabase
        .from('followers_following')
        .select('user:users!followers_following_following_id_fkey(id,username)')
        .eq('follower_id', user?.value?.id)
    if (!following) return;

    ownerIds.value = following.flatMap(f => f.user.map((user) => user.id));

    const { data: dbPosts } = await supabase
        .from('posts')
        .select()
        .in('owner_id', ownerIds.value)
        .range(lastCardIndex.value + 1, lastCardIndex.value + 3)
        .order('created_at', { ascending: false });
    if (!dbPosts?.length) {
        reachedEnd.value = true;
        return;
    }
    if (dbPosts) {
        const users = following.flatMap(f => f.user);
        posts.value = [
            ...posts.value,
            ...dbPosts?.map(post => {
                let user = users.find(user => user.id === post.owner_id)
                return { ...post, username: user?.username }
            })
        ]
        lastCardIndex.value += 3;
    }
}
</script>

<template>
    <div class="timeline-container">
        <Card v-for="post in posts" :key="post.id" :id="post.id" :url="post.url" :username="post.username"
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