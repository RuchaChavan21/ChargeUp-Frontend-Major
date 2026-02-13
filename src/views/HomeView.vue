<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const navigateToLogin = () => {
  router.push('/login');
};

const navigateToMap = () => {
  router.push('/map');
};
</script>

<template>
  <div class="font-sans text-gray-900">
    <!-- Hero Section -->
    <div class="relative bg-gray-900 text-white overflow-hidden">
      <div class="absolute inset-0 z-0 opacity-40">
        <img 
          src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
          alt="EV Charging Background" 
          class="w-full h-full object-cover"
        />
      </div>
      <div class="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent z-10"></div>

      <div class="relative z-20 container mx-auto px-4 py-32 flex flex-col md:flex-row items-center">
        <div class="md:w-3/5 mb-10 md:mb-0">
          <div class="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-green-400 uppercase bg-green-900/30 rounded-full border border-green-500/30">
            The Future of Mobility
          </div>
          <h1 class="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Power Your <span class="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Journey</span>
          </h1>
          <p class="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
            Join the largest network of smart EV charging stations. 
            Locate, book, and charge your vehicle with zero hassle.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4">
            <button
              @click="authStore.isAuthenticated ? navigateToMap() : navigateToLogin()"
              class="px-8 py-4 bg-green-600 text-white rounded-xl font-bold text-lg hover:bg-green-500 transition-all shadow-lg hover:shadow-green-500/30 flex items-center justify-center group"
            >
              {{ authStore.isAuthenticated ? 'Find a Charger' : 'Get Started' }}
              <span class="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <button
              class="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-xl font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center"
            >
              Partner with Us
            </button>
          </div>
          
          <div class="mt-12 flex items-center gap-8 text-sm font-medium text-gray-400">
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-green-500"></span>
              5,000+ Stations
            </div>
            <div class="flex items-center gap-2">
               <span class="w-2 h-2 rounded-full bg-blue-500"></span>
              99.9% Uptime
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Bar -->
    <div class="bg-gray-100 border-b border-gray-200">
      <div class="container mx-auto px-4 py-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div class="text-3xl font-bold text-gray-900">50k+</div>
            <div class="text-sm text-gray-600">Happy Users</div>
          </div>
          <div>
             <div class="text-3xl font-bold text-gray-900">120+</div>
            <div class="text-sm text-gray-600">Cities Covered</div>
          </div>
          <div>
             <div class="text-3xl font-bold text-gray-900">5 GWh</div>
            <div class="text-sm text-gray-600">Energy Delivered</div>
          </div>
           <div>
             <div class="text-3xl font-bold text-gray-900">24/7</div>
            <div class="text-sm text-gray-600">Customer Support</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="py-24 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose ChargeUP?</h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">We're building the most reliable and user-friendly charging ecosystem for the modern driver.</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
          <!-- Feature 1 -->
          <div class="p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div class="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-3xl">
              📍
            </div>
            <h3 class="text-2xl font-bold mb-3 text-gray-900">Smart Navigation</h3>
            <p class="text-gray-600 leading-relaxed">
              Find the nearest available charger instantly. Our real-time map shows connector types, pricing, and live status updates.
            </p>
          </div>
          
          <!-- Feature 2 -->
          <div class="p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div class="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 text-3xl">
              📅
            </div>
            <h3 class="text-2xl font-bold mb-3 text-gray-900">Slot Reservation</h3>
            <p class="text-gray-600 leading-relaxed">
              Never wait in line again. Book your charging slot in advance for a seamless "arrive and plug" experience.
            </p>
          </div>
          
          <!-- Feature 3 -->
          <div class="p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div class="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 text-3xl">
              ⚡
            </div>
            <h3 class="text-2xl font-bold mb-3 text-gray-900">Fast & Reliable</h3>
            <p class="text-gray-600 leading-relaxed">
              Experience high-speed charging up to 350kW. Monitor your session live and pay automatically via wallet.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- How It Works -->
    <div class="py-24 bg-gray-900 text-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-16">How It Works</h2>
        
        <div class="flex flex-col md:flex-row justify-between items-center relative">
          <!-- Connecting Line (Desktop) -->
          <div class="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-700 -z-10 transform -translate-y-1/2"></div>
          
          <!-- Step 1 -->
          <div class="relative bg-gray-900 p-6 flex flex-col items-center text-center max-w-sm">
            <div class="w-20 h-20 bg-gray-800 rounded-full border-4 border-green-500 flex items-center justify-center text-3xl font-bold mb-6 shadow-lg shadow-green-500/20">
              1
            </div>
            <h3 class="text-xl font-bold mb-2">Locate</h3>
            <p class="text-gray-400">Search for nearby stations on the map or filter by amenities.</p>
          </div>

          <!-- Step 2 -->
          <div class="relative bg-gray-900 p-6 flex flex-col items-center text-center max-w-sm">
             <div class="w-20 h-20 bg-gray-800 rounded-full border-4 border-green-500 flex items-center justify-center text-3xl font-bold mb-6 shadow-lg shadow-green-500/20">
              2
            </div>
            <h3 class="text-xl font-bold mb-2">Book</h3>
            <p class="text-gray-400">Reserve a connector for your specific timeslot to ensure availability.</p>
          </div>

          <!-- Step 3 -->
          <div class="relative bg-gray-900 p-6 flex flex-col items-center text-center max-w-sm">
             <div class="w-20 h-20 bg-gray-800 rounded-full border-4 border-green-500 flex items-center justify-center text-3xl font-bold mb-6 shadow-lg shadow-green-500/20">
              3
            </div>
            <h3 class="text-xl font-bold mb-2">Charge</h3>
            <p class="text-gray-400">Plug in, track progress in real-time, and drive away fully charged.</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- CTA Band -->
    <div class="py-20 bg-green-600 relative overflow-hidden">
        <div class="absolute inset-0 bg-pattern opacity-10"></div>
        <div class="container mx-auto px-4 text-center relative z-10">
            <h2 class="text-3xl md:text-5xl font-bold text-white mb-6">Ready to start your journey?</h2>
            <p class="text-xl text-green-100 mb-10 max-w-2xl mx-auto">Join the ChargeUP community today and experience the easiest way to power your EV.</p>
             <button
              @click="authStore.isAuthenticated ? navigateToMap() : navigateToLogin()"
              class="px-10 py-4 bg-white text-green-700 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-xl hover:-translate-y-1"
            >
              Get Started Now
            </button>
        </div>
    </div>

  </div>
</template>

<style scoped>
.bg-pattern {
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
</style>