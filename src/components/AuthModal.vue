<script lang="ts" setup>
import { ref, defineProps, reactive } from 'vue';
import useUserStore from '../stores/users';
import { storeToRefs } from 'pinia';


const open = ref<boolean>(false);
const userStore = useUserStore();
const { errorMessage, loading, user } = storeToRefs(userStore);


const userCredentials = reactive({
  username: '',
  email: '',
  password: ''
});

const props = defineProps({
  isLogin: {
    type: Boolean,
    required: true
  }
});
const title = props.isLogin ? 'Login' : 'Signup';


const showModal = () => {
  open.value = true;
};

const clearCredentials = () => {
  userCredentials.username = '';
  userCredentials.email = '';
  userCredentials.password = '';
  errorMessage.value = '';
};

const handleOk = async (e: MouseEvent) => {
  if (props.isLogin) {
    await userStore.handleLogin(userCredentials);
  } else {
    await userStore.handleSignup(userCredentials);
  }
  if (user.value) {
    clearCredentials();
    open.value = false;
  }
};

const handleCancel = (e: MouseEvent) => {
  clearCredentials();
  open.value = false;
};


</script>

<template>
  <div>
    <AButton class="btn" :disabled="false" type="primary" @click="showModal">{{ title }}</AButton>
    <AModal v-model:open="open" :title="title" @ok="handleOk">
      <div v-if="!loading" class="input-contai">
        <AInput class="input" v-if="!isLogin" v-model:value="userCredentials.username" placeholder="Username" />
        <AInput class="input" v-model:value="userCredentials.email" placeholder="Email" />
        <AInput class="input" v-model:value="userCredentials.password" type="password" placeholder="Password" />
      </div>
      <div v-else class="spinner">
        <ASpin />
      </div>
      <ATypographyText class="error-message" v-if="errorMessage" type="danger">{{ errorMessage }}</ATypographyText>
      <template #footer>
        <AButton key="back" >Cancel</AButton>
        <AButton :disabled="loading" key="submit" type="primary" :loading="loading" @click="handleOk">Submit</AButton>
      </template>
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