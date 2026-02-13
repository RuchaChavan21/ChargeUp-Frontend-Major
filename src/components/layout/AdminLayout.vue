<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
import { 
  HomeIcon, 
  MapIcon, 
  BoltIcon, 
  CalendarIcon, 
  CurrencyRupeeIcon, 
  ChartBarIcon, 
  UserGroupIcon, 
  Cog6ToothIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/vue/24/outline';
import logo from '../../assets/image.png';

const router = useRouter();
const authStore = useAuthStore();
const isSidebarOpen = ref(false);

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: HomeIcon },
  { name: 'Stations', href: '/admin/stations', icon: MapIcon },
  { name: 'Ports & Status', href: '/admin/ports', icon: BoltIcon },
  { name: 'Reservations', href: '/admin/reservations', icon: CalendarIcon },
  { name: 'Revenue', href: '/admin/revenue', icon: CurrencyRupeeIcon },
  { name: 'Analytics', href: '/admin/analytics', icon: ChartBarIcon },
  { name: 'Users', href: '/admin/users', icon: UserGroupIcon },
  { name: 'Settings', href: '/admin/settings', icon: Cog6ToothIcon },
];

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex">
    <!-- Mobile Sidebar Backdrop -->
    <div 
      v-if="isSidebarOpen" 
      class="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"
      @click="toggleSidebar"
    ></div>

    <!-- Sidebar -->
    <aside 
      :class="[
        'fixed inset-y-0 left-0 z-30 w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
    >
      <div class="flex items-center h-16 px-6 bg-gray-800 border-b border-gray-700">
        <img :src="logo" alt="ChargeUP Logo" class="h-8 w-auto mr-3" />
        <h1 class="text-xl font-bold tracking-wider text-green-400">ChargeUP<span class="text-white text-xs ml-1 font-normal opacity-70">ADMIN</span></h1>
        <button @click="toggleSidebar" class="lg:hidden ml-auto text-gray-400 hover:text-white">
          <XMarkIcon class="h-6 w-6" />
        </button>
      </div>

      <nav class="mt-6 px-4 space-y-1">
        <router-link
          v-for="item in navigation"
          :key="item.name"
          :to="item.href"
          class="flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors group"
          :class="[
            $route.path.startsWith(item.href) 
              ? 'bg-green-600 text-white shadow-lg shadow-green-900/50' 
              : 'text-gray-400 hover:bg-gray-800 hover:text-white'
          ]"
        >
          <component 
            :is="item.icon" 
            class="mr-3 h-5 w-5 flex-shrink-0" 
            :class="[
              $route.path.startsWith(item.href) ? 'text-white' : 'text-gray-400 group-hover:text-white'
            ]" 
          />
          {{ item.name }}
        </router-link>
      </nav>

      <div class="absolute bottom-0 w-full p-4 border-t border-gray-800 bg-gray-900">
        <div class="flex items-center mb-4 px-2">
          <div class="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-sm font-bold">
            {{ authStore.user?.name?.charAt(0) || 'A' }}
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-white">{{ authStore.user?.name || 'Admin User' }}</p>
            <p class="text-xs text-gray-500">View Profile</p>
          </div>
        </div>
        <button 
          @click="handleLogout"
          class="w-full flex items-center px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors"
        >
          <ArrowRightOnRectangleIcon class="mr-3 h-5 w-5" />
          Sign Out
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Top Header (Mobile) -->
      <header class="bg-white shadow-sm lg:hidden h-16 flex items-center px-4 justify-between">
        <button @click="toggleSidebar" class="text-gray-500 hover:text-gray-700">
          <Bars3Icon class="h-6 w-6" />
        </button>
        <span class="font-bold text-gray-800">Admin Portal</span>
        <div class="w-6"></div> <!-- Spacer for centering -->
      </header>

      <!-- Page Content -->
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>
