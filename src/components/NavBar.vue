<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterLink, useRouter, type Router } from 'vue-router'
import Container from './Container.vue';
import AuthModal from './AuthModal.vue';
import useUserStore from '../stores/users';
import { storeToRefs } from 'pinia';

const searchUserName = ref<string>('');
const router: Router = useRouter();

const onSearch = () => {
    if (searchUserName.value.length) {
        router.push({ name: 'profile', params: { username: searchUserName.value } })
        searchUserName.value = '';
    }
}

const userStore = useUserStore();

const { user, loadingUser } = storeToRefs(userStore);

const goToProfile = ():void => {
    router.push({ name: 'profile', params: { username: user?.value?.username }})
}

const handleLogout = async () => {
    await userStore.handleLogout();
}

</script>

<template>
    <ALayoutHeader>
        <Container>
            <div class="nav-container">
                <div class="right-content">
                    <RouterLink to="/">
                        Instagram
                    </RouterLink>
                    <AInputSearch placeholder="Search" style="width: 200px;" v-model:value="searchUserName"
                        @search="onSearch" />
                </div>
                <div class="content" v-if="!loadingUser">
                    <div class="left-content" v-if="!user">
                        <AuthModal :isLogin="false" />
                        <AuthModal :isLogin="true" />
                    </div>
                    <div class="left-content" v-else>
                        <AButton type="primary" @click="goToProfile">Profile</AButton>
                        <AButton type="primary" @click="handleLogout">Logout</AButton>
                    </div>
                </div>

            </div>
        </Container>
    </ALayoutHeader>
</template>

<style scoped>

.content {
    display: flex;
    align-items: center;
}
.nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.right-content {
    display: flex;
    align-items: center;
}

.right-content a {
    margin-right: 20px;
}

.left-content {
    display: flex;
    align-items: center;
}

.left-content button {
    margin-left: 10px;
}
</style>