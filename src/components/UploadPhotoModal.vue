<script lang="ts" setup>
import { ref } from 'vue';
import { supabase } from '@/supabase';
import { storeToRefs } from 'pinia';
import useUserStore from '../stores/users';

const file = ref<File | null>(null);
const open = ref<boolean>(false);
const caption = ref<string>('');
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const loading = ref<boolean>(false);
const errorMessage = ref<string>('');
const props = defineProps(['addNewPost']);

const showModal = () => {
  open.value = true;
};

const handleOk = async () => {
  loading.value = true;
  const fileName = Math.floor(Math.random() * 1000000000000);
  if (file.value) {
    const { data, error } = await supabase.storage.from('InstaBuck').upload('public/' + fileName, file.value);

    if (error) {
      loading.value = false;
      return errorMessage.value = "Something went wrong!"
    }
    await supabase.from('posts').insert([
      {
        owner_id: user?.value?.id,
        caption: caption.value,
        url: data.path
      },
    ]);
    file.value = null;
    open.value = false;
    caption.value = '';
    loading.value = false;
    props.addNewPost({
      url: data.path,
      caption: caption.value,
      owner_id: user?.value?.id
    })
  }
}

const handleUploadChange = (e: any) => {
  if (e.target.files[0]) {
    file.value = e.target.files[0];
    console.log(file.value);
  }
};

</script>

<template>
  <div>
    <AButton class="btn" :disabled="false" @click="showModal">Upload Photo</AButton>
    <AModal v-model:open="open" title="Upload Photo" @ok="handleOk">
      <div v-if="!loading">
        <input @change="handleUploadChange" type="file" accept="image/*">
        <AInput :maxLength="50" class="input" v-model="caption" placeholder="Caption" />
        <ATypographyText class="error-message" v-if="errorMessage" type="danger">{{ errorMessage }}</ATypographyText>
      </div>
      <div v-else class="spinner">
        <ASpin />
      </div>
    </AModal>
  </div>
</template>  
  
<style scoped>
.spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
}

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
}</style>