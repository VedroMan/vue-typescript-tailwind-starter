<script setup lang="ts">
import TabBar from './components/TabBar.vue';
</script>

<template>
  <div id="app">
    <main class="p-4">
      <div class="flex flex-col min-h-screen">
        <main class="grow">
          <router-view />
        </main>
      </div>
      <footer class="text-gray-400 white:text-dark mt-10 mb-10 text-xs py-4 font-medium tracking-tight text-center">
        <p>Produced by Tim Zykov</p>
      </footer>
    </main>
    <TabBar />
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}
</style>