<script setup lang="ts">
import { ref } from 'vue';
import { 
  ArrowDownTrayIcon, 
  CurrencyRupeeIcon, 
  ArrowTrendingUpIcon,
  CreditCardIcon
} from '@heroicons/vue/24/outline';

const transactions = ref([
  { id: 'TXN-8821', date: 'Feb 13, 2026', user: 'Rahul Sharma', type: 'Charging', amount: 450, status: 'Success' },
  { id: 'TXN-8822', date: 'Feb 13, 2026', user: 'Priya Patel', type: 'Reservation Fee', amount: 50, status: 'Success' },
  { id: 'TXN-8823', date: 'Feb 12, 2026', user: 'Amit Kumar', type: 'Charging', amount: 380, status: 'Success' },
  { id: 'TXN-8824', date: 'Feb 12, 2026', user: 'Sneha Gupta', type: 'Reservation Fee', amount: 50, status: 'Failed' },
  { id: 'TXN-8825', date: 'Feb 11, 2026', user: 'Vikram Singh', type: 'Charging', amount: 820, status: 'Success' },
]);
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Revenue & Payments</h1>
        <p class="text-gray-500 text-sm mt-1">Track financial performance and transactions</p>
      </div>
      <button class="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center shadow-sm hover:bg-gray-50 transition-colors font-medium text-sm">
        <ArrowDownTrayIcon class="w-5 h-5 mr-2" />
        Export Report
      </button>
    </div>

    <!-- Revenue Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg shadow-green-500/20">
        <div class="flex justify-between items-start mb-4">
          <div class="p-2 bg-white/20 rounded-lg">
            <CurrencyRupeeIcon class="w-6 h-6 text-white" />
          </div>
          <span class="bg-white/20 px-2 py-1 rounded text-xs font-medium text-white">+12.5%</span>
        </div>
        <div class="text-3xl font-bold mb-1">₹1,24,500</div>
        <div class="text-green-100 text-sm opacity-90">Total Revenue (This Month)</div>
      </div>

      <div class="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <div class="flex justify-between items-start mb-4">
          <div class="p-2 bg-blue-50 rounded-lg">
            <ArrowTrendingUpIcon class="w-6 h-6 text-blue-600" />
          </div>
        </div>
        <div class="text-3xl font-bold text-gray-900 mb-1">₹415</div>
        <div class="text-gray-500 text-sm">Avg. Revenue per Session</div>
      </div>

       <div class="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <div class="flex justify-between items-start mb-4">
          <div class="p-2 bg-purple-50 rounded-lg">
            <CreditCardIcon class="w-6 h-6 text-purple-600" />
          </div>
        </div>
        <div class="text-3xl font-bold text-gray-900 mb-1">145</div>
        <div class="text-gray-500 text-sm">Successful Transactions</div>
      </div>
    </div>

    <!-- Breakdown -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Recent Transactions -->
      <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-100">
          <h3 class="font-bold text-gray-800">Recent Transactions</h3>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm text-gray-600">
            <thead class="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th class="px-6 py-4">Transaction ID</th>
                <th class="px-6 py-4">Date</th>
                <th class="px-6 py-4">User</th>
                <th class="px-6 py-4">Type</th>
                <th class="px-6 py-4">Status</th>
                <th class="px-6 py-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="txn in transactions" :key="txn.id" class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4 font-mono text-xs text-gray-500">{{ txn.id }}</td>
                <td class="px-6 py-4">{{ txn.date }}</td>
                <td class="px-6 py-4 font-medium text-gray-900">{{ txn.user }}</td>
                <td class="px-6 py-4">{{ txn.type }}</td>
                 <td class="px-6 py-4">
                  <span 
                    class="px-2 py-1 text-xs font-semibold rounded-full"
                    :class="txn.status === 'Success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'"
                  >
                    {{ txn.status }}
                  </span>
                </td>
                <td class="px-6 py-4 text-right font-medium text-gray-900">₹{{ txn.amount }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Commission Info -->
      <div class="bg-gray-50 rounded-xl p-6 h-fit border border-gray-200">
        <h3 class="font-bold text-gray-900 mb-4">Payout Breakdown</h3>
        <div class="space-y-4">
          <div class="flex justify-between text-sm">
             <span class="text-gray-600">Gross Revenue</span>
             <span class="font-medium text-gray-900">₹1,24,500</span>
          </div>
          <div class="flex justify-between text-sm">
             <span class="text-gray-600">Platform Fee (5%)</span>
             <span class="font-medium text-red-600">-₹6,225</span>
          </div>
          <div class="flex justify-between text-sm">
             <span class="text-gray-600">GST (18%)</span>
             <span class="font-medium text-red-600">-₹1,120</span>
          </div>
          <div class="border-t border-gray-300 my-2 pt-2 flex justify-between items-center">
             <span class="font-bold text-gray-800">Net Payout</span>
             <span class="text-xl font-bold text-green-600">₹1,17,155</span>
          </div>
        </div>
        <button class="w-full mt-6 py-2 bg-gray-800 text-white rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors">
          Request Payout
        </button>
      </div>
    </div>
  </div>
</template>
