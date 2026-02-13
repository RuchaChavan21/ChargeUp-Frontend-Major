<script setup lang="ts">
import logo from '../../assets/image.png';
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="bg-gray-800 text-white py-8">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="mb-4 md:mb-0">
          <div class="flex items-center">
            <img :src="logo" alt="ChargeUP Logo" class="h-8 w-auto mr-3" />
            <span class="font-bold text-xl">ChargeUP</span>
          </div>
          <p class="text-gray-400 mt-2">
            A complete solution for managing EV charging stations
          </p>
        </div>
        
        <div class="mt-4 md:mt-0">
          <p class="text-gray-400">
            &copy; {{ currentYear }} EV Station Manager. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>