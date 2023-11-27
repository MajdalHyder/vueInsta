<script lang="ts" setup>
import { ref } from 'vue';



const open = ref<boolean>(false);
const caption = ref<string>('');

const showModal = () => {
  open.value = true;
};

const handleUploadChange = (e: any) => {
  console.log(e.target.files[0]);
};

</script>

<template>
  <div>
    <AButton class="btn" :disabled="false"  @click="showModal">Upload Photo</AButton>
    <AModal v-model:open="open" title="Upload Photo" @ok="">
      <input @change="handleUploadChange" type="file" accept=".jpeg,.png">
      <AInput :maxLength="50" class="input" v-model="caption" placeholder="Caption" />
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