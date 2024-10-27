<template>
    <nav
      class="flex items-center justify-between relative bg-[#141d64] shadow-md p-5 pb-3 md:px-5 md:py-2"
    >
      <!-- Left Section: Button -->
      <div>
        <router-link
          :to="{ name: 'country' }"
          class="text-[#ecc957] text-4xl rounded font-black tracking-wider transition duration-150 ease-in-out hover:text-[#ecc957d0] flex items-center space-x-5"
        >
          <!-- Olympic icon for mobile view -->
          <img src="/olympic-icon.png" alt="Olympic Icon" class="w-24 h-auto" />
          <!-- Olympic Medal Table text for desktop view -->
          <h1 class="hidden md:block">Olympic Medal Table</h1>
        </router-link>
      </div>
  
   <!-- Right Section: Login and Signup Buttons -->
   <div class="flex space-x-2 md:space-x-5">
      <!-- Login Button -->
      <router-link
        :to="{ name: 'login' }"
        class="px-3 py-2 md:px-4 md:py-2 text-lg md:text-xl font-semibold rounded-md transition duration-150 ease-in-out focus:outline-none bg-[#FEFCFB] text-[#034078] hover:bg-[#858990] hover:text-white"
      >
        Login
      </router-link>

<!-- 
      <router-link
        :to="{ name: 'signup' }"
        class="px-3 py-2 md:px-4 md:py-2 text-lg md:text-xl font-semibold rounded-md transition duration-150 ease-in-out focus:outline-none bg-[#FEFCFB] text-[#034078] hover:bg-[#858990] hover:text-white"
      >
        Signup
      </router-link> -->
    </div>
  </nav>
</template>

  
  <script>
  import { useRoute } from 'vue-router';
  
  export default {
    name: "MyNavbar",
    props: {
      id: {
        type: String,
        required: true,
      },
    },
    setup() {
      const route = useRoute();
      
      const isCurrentRoute = (routeName) => route.name === routeName;
  
      return { route, isCurrentRoute };
    },
  };
  </script>
  
  <style scoped>
  /* Add any scoped CSS here if needed */
  </style>
  