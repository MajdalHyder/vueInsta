<script setup lang="ts">
import Container from './Container.vue';
import Cards from './Cards.vue';
import useUserStore from '../stores/users';
import { storeToRefs } from 'pinia';
import { supabase } from '../supabase';
import { onMounted, ref } from 'vue';
import LoginMessage from './LoginMessage.vue';


const userStore = useUserStore();
const timelinePosts = ref<any[]>([]);
const { user, loadingUser } = storeToRefs(userStore);



const fetchdata = async () => {
    const { data: following } = await supabase
        .from('followers_following')
        .select('user:users!followers_following_following_id_fkey(id,username)')
        .eq('follower_id', user?.value?.id)
    if (!following) return;

    const { data: posts } = await supabase
        .from('posts')
        .select()
        .in('owner_id', following.map(f => {

            return f.user.id
        }))
        .order('created_at', { ascending: false });
    console.log(posts);
    if (posts) {
        timelinePosts.value = posts.map(post => {
            let user = following.find(follow => follow.user.id === post.owner_id)
            return { ...post, username: user.user.username }
        })
    }
}

onMounted(() => {
    fetchdata();
})

</script>
<template>
    <Container>
        <div v-if="!loadingUser">
            <Cards v-if="user" :timelinePosts="timelinePosts" />
            <LoginMessage message="Login please" v-else />
        </div>
        <div v-else class="timeline-spinner">
            <ASpin />
        </div>
    </Container>
</template>

<style>
.timeline-spinner {
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
}</style>