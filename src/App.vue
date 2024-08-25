<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #001f54;
  background-color: #f5f8fb; /* Light background for the whole app */
  margin: 0;
}

.wallpaper {
  background-color: #034078;
  color: white;
  padding: 60px 20px; /* Added padding to avoid content touching the edges */
  width: 100%;
  max-width: none; /* Ensure it fills the full width */
  text-align: center;
  margin-bottom: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
}

.wallpaper h1 {
  font-size: 42px;
  font-weight: 700;
  margin: 0;
}

nav {
  padding: 20px;
}

nav a {
  font-weight: bold;
  color: #034078;
  text-decoration: none;
  padding: 0 10px;
}

nav a.router-link-exact-active {
  color: #1282a2;
}

h2 {
  font-size: 24px;
  margin-top: 20px;
}
</style>
