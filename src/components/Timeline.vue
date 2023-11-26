<script setup lang="ts">
import Container from './Container.vue';
import Card from './Card.vue';

const data = [
    {
        id: 1,
        usename: 'John Doe',
        url: 'https://i.pravatar.cc/300?img=1',
        caption: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
    },
    {
        id: 2,
        usename: 'Jane Doe',
        url: 'https://i.pravatar.cc/300?img=2',
        caption: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
    }
]
</script>
<template>
    <Container>
        <div class="timeline-container">
            <Card v-for="user in data" :key="user.id" :id="user.id" :url="user.url" :username="user.usename" :caption="user.caption"/>
        </div>
    </Container>
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