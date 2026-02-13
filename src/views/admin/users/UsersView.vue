<script setup lang="ts">
import { ref } from 'vue';
import { 
  MagnifyingGlassIcon, 
  EllipsisVerticalIcon,
  UserPlusIcon,
  EnvelopeIcon,
  PhoneIcon
} from '@heroicons/vue/24/outline';

const users = ref([
  { 
    id: 1, 
    name: 'Rahul Sharma', 
    email: 'rahul@example.com', 
    phone: '+91 98765 43210', 
    role: 'User', 
    status: 'Active',
    joined: 'Jan 12, 2026',
    vehicle: 'Tata Nexon EV'
  },
  { 
    id: 2, 
    name: 'Admin User', 
    email: 'admin@demo.com', 
    phone: '+91 99887 76655', 
    role: 'Admin', 
    status: 'Active',
    joined: 'Jan 01, 2026',
    vehicle: '-'
  },
  { 
    id: 3, 
    name: 'Priya Patel', 
    email: 'priya@example.com', 
    phone: '+91 91234 56789', 
    role: 'User', 
    status: 'Inactive',
    joined: 'Feb 05, 2026',
    vehicle: 'MG ZS EV'
  },
  { 
    id: 4, 
    name: 'Amit Kumar', 
    email: 'amit@example.com', 
    phone: '+91 88776 65544', 
    role: 'Station Owner', 
    status: 'Pending',
    joined: 'Feb 10, 2026',
    vehicle: '-'
  },
]);

const searchQuery = ref('');

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active': return 'bg-green-100 text-green-800';
    case 'Inactive': return 'bg-gray-100 text-gray-800';
    case 'Pending': return 'bg-amber-100 text-amber-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">User Management</h1>
         <p class="text-gray-500 text-sm mt-1">Manage platform users, roles, and permissions</p>
      </div>
      <button class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center shadow-sm transition-colors">
        <UserPlusIcon class="w-5 h-5 mr-2" />
        Add User
      </button>
    </div>

    <!-- Search Tool bar -->
    <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
      <div class="relative max-w-md">
        <MagnifyingGlassIcon class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Search users by name, email or phone..." 
          class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
        />
      </div>
    </div>

    <!-- Users Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="user in users" :key="user.id" class="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow overflow-hidden group">
        <div class="p-6">
          <div class="flex justify-between items-start mb-4">
            <div class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-600 overflow-hidden">
               <img v-if="user.id === 1" src="https://i.pravatar.cc/150?u=1" class="w-full h-full object-cover">
               <span v-else>{{ user.name.charAt(0) }}</span>
            </div>
            <button class="text-gray-400 hover:text-gray-600">
              <EllipsisVerticalIcon class="w-5 h-5" />
            </button>
          </div>
          
          <h3 class="font-bold text-lg text-gray-900 mb-1">{{ user.name }}</h3>
          <p class="text-sm text-gray-500 mb-4">{{ user.role }}</p>
          
          <div class="space-y-2 text-sm text-gray-600 mb-6">
            <div class="flex items-center gap-2">
              <EnvelopeIcon class="w-4 h-4 text-gray-400" />
              <span class="truncate">{{ user.email }}</span>
            </div>
            <div class="flex items-center gap-2">
              <PhoneIcon class="w-4 h-4 text-gray-400" />
              <span>{{ user.phone }}</span>
            </div>
            <div class="flex items-center gap-2" v-if="user.vehicle !== '-'">
               <span class="w-4 h-4 flex items-center justify-center text-xs">🚗</span>
               <span>{{ user.vehicle }}</span>
            </div>
          </div>
          
          <div class="flex items-center justify-between pt-4 border-t border-gray-100">
             <span class="px-2 py-1 rounded text-xs font-semibold" :class="getStatusColor(user.status)">{{ user.status }}</span>
             <span class="text-xs text-gray-400">Joined {{ user.joined }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
