<script setup lang="ts">
import TabBar from './components/TabBar.vue';
</script>

<template>
  <div id="app">
    <main class="p-4">
      <router-view />
    </main>
    <TabBar />
  </div>
</template>

<style scoped>
/* Глобальные стили приложения */
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