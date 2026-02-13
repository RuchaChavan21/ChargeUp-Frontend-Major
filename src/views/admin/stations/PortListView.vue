<script setup lang="ts">
import { 
  BoltIcon, 
  ExclamationCircleIcon,
  CheckBadgeIcon
} from '@heroicons/vue/24/outline';

const ports = [
  { id: 'CP-101', station: 'FC Road Fast Charger', type: 'CCS', power: '150kW', status: 'Available' },
  { id: 'CP-102', station: 'FC Road Fast Charger', type: 'CHAdeMO', power: '50kW', status: 'In Use' },
  { id: 'CP-201', station: 'Phoenix Market City', type: 'Type 2', power: '22kW', status: 'Maintenance' },
  { id: 'CP-301', station: 'Hinjewadi IT Park', type: 'Tesla', power: '120kW', status: 'Available' },
];
</script>

<template>
  <div class="flex flex-col items-center justify-center h-[60vh] text-center px-4">
    <div class="bg-blue-50 p-6 rounded-full mb-6">
      <BoltIcon class="w-16 h-16 text-blue-500" />
    </div>
    <h1 class="text-2xl font-bold text-gray-900 mb-2">Port Management</h1>
    <p class="text-gray-500 mb-8 max-w-md">Configure charging ports, power output, and monitor real-time status.</p>
    
    <div class="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
      <!-- Temp Mock List -->
      <div v-for="port in ports" :key="port.id" class="p-4 bg-white border border-gray-200 rounded-lg flex justify-between items-center group hover:shadow-md transition-shadow">
        <div>
          <div class="flex items-center gap-2">
            <h3 class="font-bold text-gray-800">{{ port.type }}</h3>
            <span class="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{{ port.id }}</span>
          </div>
          <p class="text-sm text-gray-500">{{ port.station }}</p>
          <p class="text-xs font-mono mt-1 text-blue-600 font-medium">{{ port.power }}</p>
        </div>
        <div>
           <span 
              class="px-3 py-1 text-xs font-bold rounded-full border"
              :class="{
                'bg-green-50 text-green-700 border-green-200': port.status === 'Available',
                'bg-blue-50 text-blue-700 border-blue-200': port.status === 'In Use',
                'bg-red-50 text-red-700 border-red-200': port.status === 'Maintenance',
              }"
            >
              {{ port.status }}
            </span>
        </div>
      </div>
    </div>
  </div>
</template>
