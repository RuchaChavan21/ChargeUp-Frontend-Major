<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from './stores/auth';
import Navbar from './components/layout/Navbar.vue';
import Footer from './components/layout/Footer.vue';

const authStore = useAuthStore();
const route = useRoute();

const isAdminRoute = computed(() => {
  return route.path.startsWith('/admin');
});

onMounted(() => {
  // Check if user is already logged in (token in localStorage)
  authStore.checkAuth();
});
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <Navbar v-if="!isAdminRoute" />
    <main class="flex-grow">
      <router-view />
    </main>
    <Footer v-if="!isAdminRoute" />
  </div>
</template>