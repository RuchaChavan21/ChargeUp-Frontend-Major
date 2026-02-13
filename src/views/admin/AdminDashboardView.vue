<script setup lang="ts">
import { ref } from 'vue';
import { 
  CurrencyRupeeIcon, 
  UserGroupIcon, 
  BoltIcon, 
  ExclamationTriangleIcon 
} from '@heroicons/vue/24/outline';

// Mock Data
const kpiStats = [
  { 
    label: 'Total Revenue', 
    value: '₹1,24,500', 
    trend: '+12.5%', 
    trendUp: true, 
    icon: CurrencyRupeeIcon,
    color: 'bg-green-500'
  },
  { 
    label: 'Total Sessions', 
    value: '1,245', 
    trend: '+5.2%', 
    trendUp: true, 
    icon: BoltIcon,
    color: 'bg-blue-500'
  },
  { 
    label: 'Active Users', 
    value: '842', 
    trend: '+18.1%', 
    trendUp: true, 
    icon: UserGroupIcon,
    color: 'bg-purple-500'
  },
  { 
    label: 'Issues Reported', 
    value: '3', 
    trend: '-2.4%', 
    trendUp: true, // actually good that it's down, but consistent UI color usually red/green
    icon: ExclamationTriangleIcon,
    color: 'bg-amber-500'
  }
];

const recentBookings = [
  { id: '#BK-7829', station: 'FC Road Fast Charger', user: 'Rahul Sharma', time: '10:30 AM', status: 'Charging', amount: '₹450' },
  { id: '#BK-7830', station: 'Phoenix Mall', user: 'Priya Patel', time: '11:15 AM', status: 'Reserved', amount: '₹120' },
  { id: '#BK-7831', station: 'Aundh BRT', user: 'Amit Kumar', time: '09:45 AM', status: 'Completed', amount: '₹380' },
  { id: '#BK-7832', station: 'Hinjewadi IT Park', user: 'Sneha Gupta', time: 'Yesterday', status: 'Completed', amount: '₹550' },
];

const alertList = [
  { id: 1, message: 'Station #4 (Magarpatta) is offline', type: 'error', time: '20 mins ago' },
  { id: 2, message: 'High load detected at FC Road Station', type: 'warning', time: '1 hour ago' },
];
</script>

<template>
  <div>
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
      <p class="text-gray-500">Welcome back, here's what's happening with your network today.</p>
    </div>

    <!-- KPI Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div 
        v-for="stat in kpiStats" 
        :key="stat.label" 
        class="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex flex-col justify-between"
      >
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm font-medium text-gray-500">{{ stat.label }}</p>
            <h3 class="text-2xl font-bold text-gray-900 mt-1">{{ stat.value }}</h3>
          </div>
          <div :class="`p-3 rounded-lg ${stat.color} bg-opacity-10 text-${stat.color.replace('bg-', '')}`">
            <component :is="stat.icon" class="w-6 h-6" />
          </div>
        </div>
        <div class="mt-4 flex items-center text-sm">
          <span :class="stat.trendUp ? 'text-green-600' : 'text-red-600'" class="font-medium mr-2">
            {{ stat.trend }}
          </span>
          <span class="text-gray-400">vs last period</span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Recent Activity Table -->
      <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 class="font-bold text-gray-800">Recent Sessions</h3>
          <button class="text-sm text-green-600 font-medium hover:text-green-700">View All</button>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm text-gray-600">
            <thead class="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th class="px-6 py-3">Booking ID</th>
                <th class="px-6 py-3">Station</th>
                <th class="px-6 py-3">User</th>
                <th class="px-6 py-3">Status</th>
                <th class="px-6 py-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="booking in recentBookings" :key="booking.id" class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4 font-mono text-xs font-semibold text-gray-500">{{ booking.id }}</td>
                <td class="px-6 py-4 font-medium text-gray-900">{{ booking.station }}</td>
                <td class="px-6 py-4">{{ booking.user }}</td>
                <td class="px-6 py-4">
                  <span 
                    class="px-2 py-1 text-xs font-semibold rounded-full"
                    :class="{
                      'bg-green-100 text-green-700': booking.status === 'Completed',
                      'bg-blue-100 text-blue-700': booking.status === 'Charging',
                      'bg-amber-100 text-amber-700': booking.status === 'Reserved'
                    }"
                  >
                    {{ booking.status }}
                  </span>
                </td>
                <td class="px-6 py-4 text-right font-medium text-gray-900">{{ booking.amount }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Alerts Panel -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100">
        <div class="px-6 py-4 border-b border-gray-100">
          <h3 class="font-bold text-gray-800">System Alerts</h3>
        </div>
        <div class="p-4 space-y-4">
          <div 
            v-for="alert in alertList" 
            :key="alert.id"
            class="flex items-start p-3 rounded-lg border-l-4"
            :class="alert.type === 'error' ? 'bg-red-50 border-red-500' : 'bg-amber-50 border-amber-500'"
          >
            <ExclamationTriangleIcon 
              class="w-5 h-5 mt-0.5 mr-3 flex-shrink-0"
              :class="alert.type === 'error' ? 'text-red-500' : 'text-amber-500'" 
            />
            <div>
              <p class="text-sm font-medium text-gray-800">{{ alert.message }}</p>
              <p class="text-xs text-gray-500 mt-1">{{ alert.time }}</p>
            </div>
          </div>
          
          <div class="p-4 text-center">
             <button class="text-sm text-gray-500 hover:text-gray-700 flex items-center justify-center w-full">
               View All Notifications
             </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
