<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '../../stores/auth';

const email = ref('');
const password = ref('');
const formError = ref('');

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const handleSubmit = async () => {
  if (!email.value || !password.value) {
    formError.value = 'Please enter both email and password';
    return;
  }

  formError.value = '';
  const success = await authStore.login({
    email: email.value,
    password: password.value
  });

  if (success) {
    if (route.query.redirect) {
      router.push(route.query.redirect as string);
    } else {
      // Redirect based on role
      if (authStore.isAdmin) {
        router.push('/dashboard');
      } else {
        router.push('/map'); // Assuming users should see the map first, or '/stations'
      }
    }
  }
};
</script>

<template>
  <div class="flex justify-center items-center min-h-[calc(100vh-12rem)]">
    <div class="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
      <div class="text-center">
        <h1 class="text-3xl font-bold text-gray-800">Welcome Back</h1>
        <p class="mt-2 text-gray-600">Sign in to manage your charging stations</p>
      </div>
      
      <form @submit.prevent="handleSubmit" class="mt-8 space-y-6">
        <div v-if="formError" class="p-3 bg-red-100 text-red-700 rounded-md text-sm">
          {{ formError }}
        </div>
        
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input 
            id="email" 
            v-model="email" 
            type="email" 
            required 
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            placeholder="your@email.com"
          />
        </div>
        
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input 
            id="password" 
            v-model="password" 
            type="password" 
            required 
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            placeholder="********"
          />
        </div>
        
        <div>
          <button 
            type="submit" 
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            :disabled="authStore.loading"
          >
            <span v-if="authStore.loading">Signing in...</span>
            <span v-else>Sign In</span>
          </button>
        </div>
      </form>
      
      <div class="text-center mt-4">
        <p class="text-sm text-gray-600">
          Don't have an account? 
          <router-link to="/register" class="font-medium text-green-600 hover:text-green-500">
            Sign up
          </router-link>
        </p>
      </div>

       <div class="mt-8 p-4 bg-gray-50 rounded-md border border-gray-200">
        <h3 class="text-sm font-medium text-gray-700 mb-2">Demo Credentials:</h3>
        <div class="grid grid-cols-1 gap-2 text-xs text-gray-600">
          <div class="flex justify-between items-center p-2 bg-white rounded border border-gray-100">
             <div>
              <span class="font-semibold block text-gray-800">Admin:</span>
              <span>admin@demo.com</span>
             </div>
             <span class="font-mono bg-gray-100 px-1 rounded">123456</span>
          </div>
          <div class="flex justify-between items-center p-2 bg-white rounded border border-gray-100">
             <div>
              <span class="font-semibold block text-gray-800">User:</span>
              <span>user@demo.com</span>
             </div>
             <span class="font-mono bg-gray-100 px-1 rounded">123456</span>
          </div>
        </div>
        <p class="text-xs text-gray-500 mt-2 text-center">Use these to test permissions.</p>
      </div>
    </div>
  </div>
</template>