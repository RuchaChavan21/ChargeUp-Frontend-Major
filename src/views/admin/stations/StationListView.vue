<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useStationsStore } from '../../../stores/stations';
import { 
  PlusIcon, 
  MagnifyingGlassIcon, 
  PencilSquareIcon, 
  TrashIcon, 
  MapPinIcon,
  FunnelIcon
} from '@heroicons/vue/24/outline';

const stationsStore = useStationsStore();
const searchQuery = ref('');
const statusFilter = ref('all');

// Fetch stations on mount
onMounted(async () => {
  await stationsStore.fetchStations();
});

// Filtered stations
const filteredStations = computed(() => {
  return stationsStore.stations.filter(station => {
    const matchesSearch = station.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          station.address.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesStatus = statusFilter.value === 'all' || station.status === statusFilter.value;
    
    return matchesSearch && matchesStatus;
  });
});

const handleDelete = async (id: string) => {
  if (confirm('Are you sure you want to delete this station?')) {
    await stationsStore.deleteStation(id);
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-800';
    case 'inactive': return 'bg-gray-100 text-gray-800';
    case 'maintenance': return 'bg-amber-100 text-amber-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};
</script>

<template>
  <div>
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Station Management</h1>
        <p class="text-gray-500 text-sm mt-1">Manage all charging locations and their status</p>
      </div>
      <button class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center shadow-sm transition-colors">
        <PlusIcon class="w-5 h-5 mr-2" />
        Add Station
      </button>
    </div>

    <!-- Filters & Search -->
    <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col sm:flex-row gap-4">
      <div class="relative flex-grow">
        <MagnifyingGlassIcon class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Search stations by name or address..." 
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
          <option value="active">Active</option>
          <option value="maintenance">Maintenance</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
    </div>

    <!-- Stations Table -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm text-gray-600">
          <thead class="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
            <tr>
              <th class="px-6 py-4">Station Name</th>
              <th class="px-6 py-4">Location</th>
              <th class="px-6 py-4">Status</th>
              <th class="px-6 py-4">Power / Type</th>
              <th class="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-if="stationsStore.loading" class="animate-pulse">
              <td colspan="5" class="px-6 py-8 text-center text-gray-400">Loading stations data...</td>
            </tr>
            <tr v-else-if="filteredStations.length === 0">
              <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                No stations found matching your criteria.
              </td>
            </tr>
            <tr 
              v-else
              v-for="station in filteredStations" 
              :key="station._id" 
              class="hover:bg-gray-50 transition-colors group"
            >
              <td class="px-6 py-4">
                <div class="font-medium text-gray-900">{{ station.name }}</div>
                <div class="text-xs text-gray-400 mt-1">ID: {{ station._id }}</div>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-start max-w-xs">
                  <MapPinIcon class="w-4 h-4 text-gray-400 mt-0.5 mr-1 flex-shrink-0" />
                  <span class="truncate">{{ station.address }}</span>
                </div>
              </td>
              <td class="px-6 py-4">
                <span 
                  class="px-2.5 py-1 rounded-md text-xs font-semibold capitalize inline-flex items-center"
                  :class="getStatusColor(station.status)"
                >
                  <span class="w-1.5 h-1.5 rounded-full mr-1.5" :class="station.status === 'active' ? 'bg-green-500' : (station.status === 'inactive' ? 'bg-gray-500' : 'bg-amber-500')"></span>
                  {{ station.status }}
                </span>
              </td>
              <td class="px-6 py-4">
                <div class="text-gray-900">{{ station.powerOutput }} kW</div>
                <div class="text-xs text-gray-500">{{ station.connectorType }}</div>
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button class="p-1.5 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Edit">
                    <PencilSquareIcon class="w-5 h-5" />
                  </button>
                  <button 
                    @click="handleDelete(station._id)"
                    class="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                    title="Delete"
                  >
                    <TrashIcon class="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Pagination (Mock) -->
      <div class="px-6 py-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
        <div>Showing <span class="font-medium text-gray-900">{{ filteredStations.length }}</span> results</div>
        <div class="flex gap-2">
          <button class="px-3 py-1 border border-gray-200 rounded-md disabled:opacity-50" disabled>Previous</button>
          <button class="px-3 py-1 border border-gray-200 rounded-md hover:bg-gray-50">Next</button>
        </div>
      </div>
    </div>
  </div>
</template>
