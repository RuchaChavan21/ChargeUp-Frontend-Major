<script setup lang="ts">
import { ref } from 'vue';
import { 
  ArrowTrendingUpIcon, 
  UserGroupIcon, 
  MapPinIcon,
  ClockIcon
} from '@heroicons/vue/24/outline';

const timeRange = ref('7d');

const stats = [
  { label: 'Total Energy Dispensed', value: '4.2 MWh', change: '+12%', trend: 'up' },
  { label: 'Avg. Charging Time', value: '42 mins', change: '-5%', trend: 'down' },
  { label: 'Peak Usage Hour', value: '18:00 - 19:00', change: '', trend: 'neutral' },
  { label: 'User Retention', value: '85%', change: '+2%', trend: 'up' },
];

const stationPerformance = [
  { name: 'FC Road Fast Charger', sessions: 145, revenue: 5200, utilization: 78 },
  { name: 'Phoenix Market City', sessions: 98, revenue: 3100, utilization: 62 },
  { name: 'Hinjewadi IT Park', sessions: 210, revenue: 8400, utilization: 92 },
  { name: 'Aundh BRT Station', sessions: 65, revenue: 1800, utilization: 45 },
];
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p class="text-gray-500 text-sm mt-1">Deep dive into network performance</p>
      </div>
      <div class="bg-white border border-gray-200 rounded-lg p-1 flex text-sm font-medium">
        <button 
          @click="timeRange = '24h'"
          class="px-3 py-1.5 rounded-md transition-colors"
          :class="timeRange === '24h' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-900'"
        >24h</button>
        <button 
          @click="timeRange = '7d'"
          class="px-3 py-1.5 rounded-md transition-colors"
           :class="timeRange === '7d' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-900'"
        >7 Days</button>
        <button 
          @click="timeRange = '30d'"
          class="px-3 py-1.5 rounded-md transition-colors"
           :class="timeRange === '30d' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-900'"
        >30 Days</button>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div v-for="stat in stats" :key="stat.label" class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <p class="text-sm font-medium text-gray-500 mb-1">{{ stat.label }}</p>
        <div class="flex items-end justify-between">
          <h3 class="text-2xl font-bold text-gray-900">{{ stat.value }}</h3>
          <span 
            v-if="stat.change"
            class="text-xs font-medium px-2 py-1 rounded bg-opacity-10"
            :class="stat.trend === 'up' ? 'text-green-600 bg-green-500' : 'text-red-600 bg-red-500'"
          >
            {{ stat.change }}
          </span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <!-- Utilization Chart Placeholder -->
      <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm min-h-[300px] flex flex-col">
        <h3 class="font-bold text-gray-800 mb-6">Hourly Utilization</h3>
        <div class="flex-grow flex items-end justify-between gap-2 px-4 pb-2 border-b border-gray-100">
           <!-- Mock Bars -->
           <div v-for="i in 12" :key="i" class="w-full bg-blue-100 rounded-t-sm hover:bg-blue-200 transition-colors relative group" :style="{ height: `${Math.random() * 80 + 20}%` }">
             <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
               {{ Math.floor(Math.random() * 100) }} sessions
             </div>
           </div>
        </div>
        <div class="flex justify-between mt-2 text-xs text-gray-400">
          <span>00:00</span>
          <span>06:00</span>
          <span>12:00</span>
          <span>18:00</span>
          <span>23:59</span>
        </div>
      </div>

       <!-- Revenue Chart Placeholder -->
      <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm min-h-[300px] flex flex-col">
        <h3 class="font-bold text-gray-800 mb-6">Revenue Trend</h3>
         <div class="flex-grow flex items-end justify-between gap-2 px-4 pb-2 border-b border-gray-100">
           <!-- Mock Bars -->
           <div v-for="i in 7" :key="i" class="w-full bg-green-100 rounded-t-sm hover:bg-green-200 transition-colors relative group" :style="{ height: `${Math.random() * 80 + 20}%` }">
               <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
               ₹{{ Math.floor(Math.random() * 5000) }}
             </div>
           </div>
        </div>
        <div class="flex justify-between mt-2 text-xs text-gray-400">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
      </div>
    </div>

    <!-- Detailed Table -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-100">
        <h3 class="font-bold text-gray-800">Station Performance</h3>
      </div>
      <table class="w-full text-left text-sm text-gray-600">
        <thead class="bg-gray-50 text-gray-500 font-medium">
          <tr>
            <th class="px-6 py-3">Station Name</th>
            <th class="px-6 py-3 text-right">Sessions</th>
            <th class="px-6 py-3 text-right">Revenue</th>
            <th class="px-6 py-3 text-right">Utilization</th>
             <th class="px-6 py-3">Trends</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="station in stationPerformance" :key="station.name" class="hover:bg-gray-50">
            <td class="px-6 py-4 font-medium text-gray-900">{{ station.name }}</td>
            <td class="px-6 py-4 text-right">{{ station.sessions }}</td>
            <td class="px-6 py-4 text-right">₹{{ station.revenue }}</td>
            <td class="px-6 py-4 text-right">
              <div class="flex items-center justify-end gap-2">
                <span class="font-medium">{{ station.utilization }}%</span>
                <div class="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div class="h-full bg-blue-500" :style="{ width: `${station.utilization}%` }"></div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4">
              <ArrowTrendingUpIcon class="w-4 h-4 text-green-500" v-if="station.utilization > 70" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
