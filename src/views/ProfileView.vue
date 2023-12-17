<script setup lang="ts">
import Profile from '../components/Profile.vue';
</script>
<template>
    <div>
        <Profile :key="$route.params.username as string | number | symbol | undefined"/>
    </div>
</template>