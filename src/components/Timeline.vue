<script setup lang="ts">
import Container from './Container.vue';
import Cards from './Cards.vue';
import useUserStore from '../stores/users';
import { storeToRefs } from 'pinia';
import LoginMessage from './LoginMessage.vue';


const userStore = useUserStore();
const { user, loadingUser } = storeToRefs(userStore);


</script>
<template>
    <Container>
        <div v-if="!loadingUser">
            <Cards v-if="user"/>
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