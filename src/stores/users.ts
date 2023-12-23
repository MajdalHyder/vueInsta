import { type StoreDefinition, defineStore } from 'pinia';
import { ref } from 'vue';
import { supabase } from '../supabase';

interface newUser {
  email: string;
  password: string;
  username: string;
}

interface User {
  email: string;
  username: string;
  id: number;
}

const useUserStore = defineStore('users', () => {
  const user = ref<User | null>(null);
  const errorMessage = ref<String>('');
  const loading = ref<Boolean>(false);
  const loadingUser = ref<Boolean>(false);

  const validateEmail = (email: String): RegExpMatchArray | null => {
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };
  const handleLogin = async (
    credentials: newUser
  ): Promise<String | undefined> => {
    const { email, password }: { email: string; password: string } =
      credentials;
    loading.value = true;

    if (!validateEmail(email)) {
      return (errorMessage.value = 'Invalid email address');
    }

    if (password.length === 0) {
      return (errorMessage.value = 'Password cannot be empty');
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      loading.value = false;
      return (errorMessage.value = error.message);
    }

    const { data: existingUser } = await supabase
      .from('users')
      .select()
      .eq('email', email)
      .single();

    user.value = {
      email: existingUser.email,
      username: existingUser.username,
      id: existingUser.id,
    };

    loading.value = false;
    errorMessage.value = '';
  };

  const handleLogout = async (): Promise<void> => {
    await supabase.auth.signOut();
    user.value = null;
  };

  const handleSignup = async (credentials: newUser): Promise<String | undefined>  => {
    const { email, password, username }: { email: string; password: string, username: string } = credentials;

    if (password.length < 6) {
      return (errorMessage.value =
        'Password must be at least 6 characters long');
    }

    if (username.length < 4) {
      return (errorMessage.value =
        'Username must be at least 4 characters long');
    }

    if (!validateEmail(email)) {
      if (!validateEmail(email)) {
        return (errorMessage.value = 'Invalid email address');
      }
    }

    loading.value = true;

    const { data: alreadyThere } = await supabase
      .from('users')
      .select()
      .eq('email', email)
      .single();

    if (alreadyThere) {
      loading.value = false;
      return (errorMessage.value = 'Email already in use');
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      loading.value = false;
      return (errorMessage.value = error.message);
    }

    const resp = await supabase.from('users').insert({
      username,
      email,
    });

    const { data: newUser } = await supabase
      .from('users')
      .select()
      .eq('email', email)
      .single();

    user.value = {
      email: newUser.email,
      username: newUser.username,
      id: newUser.id,
    };
    errorMessage.value = '';

    loading.value = false;
  };

  const clearErrorMessage = () => {
    errorMessage.value = '';
  };

  const getUser = async () => {
    loadingUser.value = true;
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      loadingUser.value = false;
      return (user.value = null);
    }

    const { data: existingUser } = await supabase
      .from('users')
      .select()
      .eq('email', data?.user?.email)
      .single();
    user.value = {
      email: existingUser.email,
      username: existingUser.username,
      id: existingUser.id,
    };
    loadingUser.value = false;
  };

  return {
    user,
    handleLogin,
    handleLogout,
    handleSignup,
    getUser,
    errorMessage,
    clearErrorMessage,
    loading,
    loadingUser,
  };
});

export default useUserStore;
