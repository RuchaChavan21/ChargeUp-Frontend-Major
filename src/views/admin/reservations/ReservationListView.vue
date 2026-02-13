<script setup lang="ts">
import { ref } from 'vue';
import { 
  CalendarIcon, 
  ClockIcon, 
  UserIcon,
  CheckCircleIcon,
  XCircleIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/vue/24/outline';

// Mock Data for Reservations
const reservations = ref([
  {
    id: 'RES-1001',
    user: { name: 'Rahul Sharma', email: 'rahul@example.com', avatar: null },
    station: { name: 'FC Road Fast Charger', address: 'Shivajinagar, Pune' },
    date: '2026-02-14',
    time: '10:00 AM - 11:30 AM',
    status: 'confirmed',
    amount: 450,
    vehicle: 'Tata Nexon EV'
  },
  {
    id: 'RES-1002',
    user: { name: 'Priya Patel', email: 'priya@example.com', avatar: null },
    station: { name: 'Phoenix Market City Charger', address: 'Viman Nagar, Pune' },
    date: '2026-02-14',
    time: '02:00 PM - 03:00 PM',
    status: 'pending',
    amount: 120,
    vehicle: 'MG ZS EV'
  },
  {
    id: 'RES-1003',
    user: { name: 'Amit Kumar', email: 'amit@example.com', avatar: null },
    station: { name: 'Hinjewadi IT Park Station', address: 'Hinjewadi, Pune' },
    date: '2026-02-13',
    time: '09:00 AM - 10:00 AM',
    status: 'completed',
    amount: 380,
    vehicle: 'Hyundai Kona'
  },
  {
    id: 'RES-1004',
    user: { name: 'Sneha Gupta', email: 'sneha@example.com', avatar: null },
    station: { name: 'Aundh BRT Station', address: 'Aundh, Pune' },
    date: '2026-02-13',
    time: '04:30 PM - 05:00 PM',
    status: 'cancelled',
    amount: 0,
    vehicle: 'Tata Tiago EV'
  },
   {
    id: 'RES-1005',
    user: { name: 'Vikram Singh', email: 'vikram@example.com', avatar: null },
    station: { name: 'FC Road Fast Charger', address: 'Shivajinagar, Pune' },
    date: '2026-02-15',
    time: '11:00 AM - 12:00 PM',
    status: 'confirmed',
    amount: 300,
    vehicle: 'Mahindra XUV400'
  }
]);

const statusFilter = ref('all');
const searchQuery = ref('');

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'confirmed': return 'bg-blue-100 text-blue-800';
    case 'completed': return 'bg-green-100 text-green-800';
    case 'pending': return 'bg-amber-100 text-amber-800';
    case 'cancelled': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Reservations</h1>
      <p class="text-gray-500 text-sm mt-1">View and manage booking requests</p>
    </div>

    <!-- Filters -->
    <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col sm:flex-row gap-4">
      <div class="relative flex-grow">
        <MagnifyingGlassIcon class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Search by Booking ID, User, or Station..." 
          class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
        />
      </div>
      
      <div class="flex items-center gap-2 min-w-[200px]">
        <FunnelIcon class="w-5 h-5 text-gray-500" />
        <select 
          v-model="statusFilter"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none bg-white"
        >
          <option value="all">All Status</option>
          <option value="confirmed">Confirmed</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
    </div>

    <!-- Reservations List -->
    <div class="space-y-4">
      <div 
        v-for="res in reservations" 
        :key="res.id"
        class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col lg:flex-row gap-6 items-start lg:items-center hover:border-green-200 transition-colors"
      >
        <!-- Date Box -->
        <div class="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg min-w-[80px] border border-gray-100">
          <span class="text-xs font-bold text-gray-500 uppercase">{{ new Date(res.date).toLocaleString('default', { month: 'short' }) }}</span>
          <span class="text-2xl font-bold text-gray-900">{{ new Date(res.date).getDate() }}</span>
          <span class="text-xs text-gray-400">{{ new Date(res.date).toLocaleString('default', { weekday: 'short' }) }}</span>
        </div>

        <!-- Info -->
        <div class="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="text-xs font-mono font-medium text-gray-400">{{ res.id }}</span>
              <span :class="getStatusBadge(res.status)" class="px-2 py-0.5 rounded text-xs font-bold capitalize">{{ res.status }}</span>
            </div>
            <h3 class="font-bold text-gray-900 text-lg">{{ res.station.name }}</h3>
            <p class="text-sm text-gray-500">{{ res.station.address }}</p>
          </div>

          <div class="space-y-2 text-sm text-gray-600">
            <div class="flex items-center gap-2">
              <ClockIcon class="w-4 h-4 text-gray-400" />
              <span>{{ res.time }}</span>
            </div>
            <div class="flex items-center gap-2">
              <UserIcon class="w-4 h-4 text-gray-400" />
              <span>{{ res.user.name }} • {{ res.vehicle }}</span>
            </div>
          </div>
        </div>

        <!-- Price & Actions -->
        <div class="flex flex-row lg:flex-col items-center lg:items-end justify-between w-full lg:w-auto gap-4 border-t lg:border-t-0 border-gray-100 pt-4 lg:pt-0">
          <div class="text-right">
            <div class="text-xl font-bold text-gray-900">₹{{ res.amount }}</div>
            <div class="text-xs text-gray-400">Total Amount</div>
          </div>
          
          <div class="flex gap-2">
             <button title="Approve" class="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors" v-if="res.status === 'pending'">
               <CheckCircleIcon class="w-5 h-5" />
             </button>
             <button title="Cancel" class="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors" v-if="['pending', 'confirmed'].includes(res.status)">
               <XCircleIcon class="w-5 h-5" />
             </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
