<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import useUserStore from './stores/users';
import { onMounted } from 'vue';

const { getUser } = useUserStore();

onMounted(() => {
  getUser();
})

</script>

<template>
  <main>
    <NavBar/>
    <RouterView/>
  </main>
</template>

<style scoped>

</style>
