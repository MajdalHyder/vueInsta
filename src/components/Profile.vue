<script setup lang="ts">
import Container from './Container.vue';
import UserBar from './UserBar.vue';
import ImageGallery from './ImageGallery.vue';

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
        <div class="profile-container">
            <UserBar :key="$route?.params?.username" username="Majd" :userInfo="{posts: 4, followers: 200, follwing: 400}"/>
            <ImageGallery :posts="[{
                id: 1,
                image: 'https://i.pravatar.cc/300?img=1',
            },
            {
                id: 2,
                image: 'https://i.pravatar.cc/300?img=2',
            
            }]"/>
        </div>
    </Container>
</template>

<style scoped>
.profile-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px 0;
}
</style>