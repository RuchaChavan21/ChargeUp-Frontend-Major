import { defineStore } from 'pinia';
import { ref } from 'vue';
// import api from '../services/api';
import { toast } from 'vue3-toastify';

export interface Location {
  lat: number;
  lng: number;
}

export interface ChargingStation {
  _id: string;
  name: string;
  location: Location;
  address: string;
  status: 'active' | 'inactive' | 'maintenance';
  powerOutput: number;
  connectorType: 'Type 1' | 'Type 2' | 'CCS' | 'CHAdeMO' | 'Tesla';
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export interface StationFilters {
  status?: string;
  connectorType?: string;
  minPower?: number;
  maxPower?: number;
}

export const useStationsStore = defineStore('stations', () => {
  // Initialize with some mock data for Pune, India
  const stations = ref<ChargingStation[]>([
    {
      _id: '1',
      name: 'FC Road Fast Charger',
      location: { lat: 18.5196, lng: 73.8418 },
      address: 'Fergusson College Rd, Shivajinagar, Pune, Maharashtra 411004',
      status: 'active',
      powerOutput: 150,
      connectorType: 'CCS',
      owner: 'dev-admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      _id: '2',
      name: 'Phoenix Market City Charger',
      location: { lat: 18.5621, lng: 73.9167 },
      address: 'Viman Nagar Rd, Pune, Maharashtra 411014',
      status: 'active',
      powerOutput: 50,
      connectorType: 'Type 2',
      owner: 'dev-admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      _id: '3',
      name: 'Hinjewadi IT Park Station',
      location: { lat: 18.5913, lng: 73.7389 },
      address: 'Phase 1, Hinjawadi Rajiv Gandhi Infotech Park, Pune, Maharashtra 411057',
      status: 'maintenance',
      powerOutput: 120,
      connectorType: 'Tesla',
      owner: 'dev-admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      _id: '4',
      name: 'Magarpatta City EV Hub',
      location: { lat: 18.5137, lng: 73.9297 },
      address: 'Magarpatta City, Hadapsar, Pune, Maharashtra 411028',
      status: 'inactive',
      powerOutput: 350,
      connectorType: 'CCS',
      owner: 'dev-admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      _id: '5',
      name: 'Aundh BRT Station',
      location: { lat: 18.5602, lng: 73.8031 },
      address: 'Aundh, Pune, Maharashtra 411007',
      status: 'active',
      powerOutput: 60,
      connectorType: 'CHAdeMO',
      owner: 'dev-admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]);

  const currentStation = ref<ChargingStation | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Get all stations with optional filters
  async function fetchStations(filters: StationFilters = {}) {
    loading.value = true;
    error.value = null;

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      let result = [...stations.value];

      // Apply mock filters if needed (for demonstration)
      if (filters.status) {
        result = result.filter(s => s.status === filters.status);
      }

      // We don't need to assign result to stations.value because stations.value IS our database for now.
      // However, if we were actually filtering for a view, we might return the filtered list.
      // But fetchStations usually updates the 'stations' state.
      // In a real app, 'stations' state reflects what's on the screen.
      // So let's just keep stations.value as the full list for this mock "database" 
      // AND return the filtered list if we were doing server-side filtering.
      // BUT, checking the component usage, it likely reads from store.stations.

      // IMPORTANT: In this mock implementation, 'stations' ref acts as BOTH the local cache AND the backend database.
      // If we filter 'stations.value', we lose data.
      // So let's NOT filter stations.value here, but just return the filtered data if needed, 
      // or assume the component filters it.
      // Actually, typically fetchStations overwrites local state with server state.
      // So let's make a separate 'mockDatabase' if we want to be persistent, OR just let the initial state be the database
      // and 'fetch' just returns it.

      return result;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch stations';
      error.value = message;
      toast.error(message);
      return [];
    } finally {
      loading.value = false;
    }
  }

  // Get station by ID
  async function fetchStationById(id: string) {
    loading.value = true;
    error.value = null;

    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      const station = stations.value.find(s => s._id === id);
      if (station) {
        currentStation.value = station;
        return station;
      } else {
        throw new Error('Station not found');
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch station details';
      error.value = message;
      toast.error(message);
      return null;
    } finally {
      loading.value = false;
    }
  }

  // Create new station
  async function createStation(stationData: Omit<ChargingStation, '_id' | 'owner' | 'createdAt' | 'updatedAt'>) {
    loading.value = true;
    error.value = null;

    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const newStation: ChargingStation = {
        ...stationData,
        _id: Math.random().toString(36).substr(2, 9),
        owner: 'dev-admin',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      stations.value.push(newStation);
      toast.success('Charging station created successfully (Mock)');
      return newStation;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to create station';
      error.value = message;
      toast.error(message);
      return null;
    } finally {
      loading.value = false;
    }
  }

  // Update station
  async function updateStation(id: string, stationData: Partial<ChargingStation>) {
    loading.value = true;
    error.value = null;

    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const index = stations.value.findIndex(s => s._id === id);
      if (index !== -1) {
        stations.value[index] = {
          ...stations.value[index],
          ...stationData,
          updatedAt: new Date().toISOString()
        };
        toast.success('Charging station updated successfully (Mock)');
        return stations.value[index];
      } else {
        throw new Error('Station not found');
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to update station';
      error.value = message;
      toast.error(message);
      return null;
    } finally {
      loading.value = false;
    }
  }

  // Delete station
  async function deleteStation(id: string) {
    loading.value = true;
    error.value = null;

    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      stations.value = stations.value.filter(station => station._id !== id);
      toast.success('Charging station deleted successfully (Mock)');
      return true;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to delete station';
      error.value = message;
      toast.error(message);
      return false;
    } finally {
      loading.value = false;
    }
  }

  return {
    stations,
    currentStation,
    loading,
    error,
    fetchStations,
    fetchStationById,
    createStation,
    updateStation,
    deleteStation
  };
});