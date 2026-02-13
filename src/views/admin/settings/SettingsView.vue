<script setup lang="ts">
import { ref } from 'vue';
import { 
  BellIcon, 
  LockClosedIcon, 
  CreditCardIcon, 
  GlobeAltIcon,
  SquaresPlusIcon
} from '@heroicons/vue/24/outline';

const activeTab = ref('general');

const generalSettings = ref({
  platformName: 'ChargeUP',
  supportEmail: 'support@chargeup.com',
  maintenanceMode: false,
});

const pricingSettings = ref({
  baseCommission: 5,
  taxRate: 18,
  cancellationFee: 50,
});
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
    
    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Sidebar Navigation for Settings -->
      <div class="w-full lg:w-64 flex-shrink-0">
        <nav class="space-y-1">
          <button 
            @click="activeTab = 'general'"
            class="w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors"
            :class="activeTab === 'general' ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-50'"
          >
            <GlobeAltIcon class="flex-shrink-0 -ml-1 mr-3 h-5 w-5" />
            General
          </button>
           <button 
            @click="activeTab = 'pricing'"
            class="w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors"
            :class="activeTab === 'pricing' ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-50'"
          >
            <CreditCardIcon class="flex-shrink-0 -ml-1 mr-3 h-5 w-5" />
            Pricing & Commission
          </button>
           <button 
            @click="activeTab = 'notifications'"
            class="w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors"
            :class="activeTab === 'notifications' ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-50'"
          >
            <BellIcon class="flex-shrink-0 -ml-1 mr-3 h-5 w-5" />
            Notifications
          </button>
           <button 
            @click="activeTab = 'security'"
            class="w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors"
            :class="activeTab === 'security' ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-50'"
          >
            <LockClosedIcon class="flex-shrink-0 -ml-1 mr-3 h-5 w-5" />
            Security
          </button>
           <button 
            @click="activeTab = 'features'"
            class="w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors"
            :class="activeTab === 'features' ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-50'"
          >
            <SquaresPlusIcon class="flex-shrink-0 -ml-1 mr-3 h-5 w-5" />
            Feature Flags
          </button>
        </nav>
      </div>

      <!-- Settings Content -->
      <div class="flex-grow bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        
        <!-- General Settings -->
        <div v-if="activeTab === 'general'" class="space-y-6">
          <div>
            <h3 class="text-lg font-medium leading-6 text-gray-900">General Information</h3>
            <p class="mt-1 text-sm text-gray-500">Update your platform's public information.</p>
          </div>
          
          <div class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
            <div>
              <label for="platform-name" class="block text-sm font-medium text-gray-700">Platform Name</label>
              <input type="text" v-model="generalSettings.platformName" id="platform-name" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm">
            </div>
             <div>
              <label for="support-email" class="block text-sm font-medium text-gray-700">Support Email</label>
              <input type="email" v-model="generalSettings.supportEmail" id="support-email" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm">
            </div>
          </div>

          <div class="pt-6 border-t border-gray-200">
             <div class="flex items-center justify-between">
                <div>
                   <h3 class="text-base font-medium text-gray-900">Maintenance Mode</h3>
                   <p class="text-sm text-gray-500">Take the platform offline for updates.</p>
                </div>
                <button 
                  @click="generalSettings.maintenanceMode = !generalSettings.maintenanceMode"
                  :class="generalSettings.maintenanceMode ? 'bg-green-600' : 'bg-gray-200'"
                  class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <span 
                    :class="generalSettings.maintenanceMode ? 'translate-x-5' : 'translate-x-0'"
                    class="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                  ></span>
                </button>
             </div>
          </div>
        </div>

        <!-- Pricing Settings -->
         <div v-if="activeTab === 'pricing'" class="space-y-6">
             <div>
            <h3 class="text-lg font-medium leading-6 text-gray-900">Pricing & Commissions</h3>
            <p class="mt-1 text-sm text-gray-500">Configure global financial rules.</p>
          </div>
          
          <div class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
             <div>
              <label class="block text-sm font-medium text-gray-700">Platform Commission (%)</label>
              <div class="mt-1 relative rounded-md shadow-sm">
                <input type="number" v-model="pricingSettings.baseCommission" class="focus:ring-green-500 focus:border-green-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md py-2" placeholder="0.00">
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span class="text-gray-500 sm:text-sm">%</span>
                </div>
              </div>
            </div>

             <div>
              <label class="block text-sm font-medium text-gray-700">Tax / GST Rate (%)</label>
              <div class="mt-1 relative rounded-md shadow-sm">
                <input type="number" v-model="pricingSettings.taxRate" class="focus:ring-green-500 focus:border-green-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md py-2" placeholder="0.00">
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span class="text-gray-500 sm:text-sm">%</span>
                </div>
              </div>
            </div>
             <div>
              <label class="block text-sm font-medium text-gray-700">Cancellation Fee (₹)</label>
              <div class="mt-1 relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span class="text-gray-500 sm:text-sm">₹</span>
                </div>
                <input type="number" v-model="pricingSettings.cancellationFee" class="focus:ring-green-500 focus:border-green-500 block w-full pl-7 sm:text-sm border-gray-300 rounded-md py-2" placeholder="0.00">
              </div>
            </div>
          </div>
         </div>

        <!-- Actions -->
        <div class="pt-6 border-t border-gray-200 mt-6 flex justify-end">
          <button type="button" class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mr-3">
            Cancel
          </button>
          <button type="submit" class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            Save Changes
          </button>
        </div>

      </div>
    </div>
  </div>
</template>
