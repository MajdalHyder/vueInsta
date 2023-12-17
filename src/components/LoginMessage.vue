<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
    message: {
        type: String,
        required: true,
    }
})
</script>

<template>
    <div class="timeline-container">
        <h1>{{ props.message }}</h1>
    </div>
</template>