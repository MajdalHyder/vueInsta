<script lang="ts" setup>
import { ref } from 'vue';
import useUserStore from '../stores/users';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const open = ref<boolean>(false);
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const router = useRouter();

console.log(router.currentRoute.value.params.username);


const showModal = () => {
  open.value = true;
};


</script>

<template>
  <div>
    <AButton class="btn" :disabled="false"  @click="showModal">Upload Photo</AButton>
    <AModal v-model:open="open" title="Upload Photo" @ok="">
      
    </AModal>
  </div>
</template>  
  
<style scoped>

.error-message {
  margin-top: 20px !important;
}
.btn {
  margin-left: 15px;
}

.input {
  margin-top: 10px;
}

.input-contai {
  height: 120px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}
.spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
}
</style>