<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="layout">
    <header>
      <div class="wrapper">
        <nav>
          <RouterLink to="/">Home</RouterLink> |
          <RouterLink to="/about">About</RouterLink>
        </nav>
      </div>
    </header>
  </div>
</template>

<style>
#layout {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #001F54; /* main font color */
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #034078;
}

nav a.router-link-exact-active {
  color: #1282A2;
}

h2 {
  font-size: 20px;
  margin-top: 0;
}
</style>