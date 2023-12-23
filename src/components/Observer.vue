<script setup lang="ts">
import { emit } from 'process';
import { onMounted, ref, defineEmits } from 'vue';

const observer = ref<IntersectionObserver | null>(null);
const root = ref<Element | null>(null);
const emits = defineEmits(['intersect']);

onMounted(() => {
    observer.value = new IntersectionObserver(([entry]) => {
        if(entry && entry.isIntersecting) {
            emits('intersect');
        } else {
            console.log('not intersecting');
        }
    })

    observer.value.observe(root.value!);
})
</script>
<template>
    <div class="observer" ref="root">
        
    </div>
</template>

<style scoped>
.observer {
    height: 5px;
    width: 100px;

}
</style>