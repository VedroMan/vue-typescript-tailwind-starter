<template>
  <header class="p-4 bg-gray-800 text-white">
    <nav>
      <ul class="flex space-x-4">
        <li>
          <router-link to="/" class="hover:underline">Главная</router-link>
        </li>
        <li>
          <router-link to="/days" class="hover:underline">Дни недели 📆</router-link>
        </li>
        <li>
          <router-link to="/teachers" class="hover:underline">Учителя 👨‍🏫</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
// Логика компонента (если необходима)
</script>

<style scoped>
/* Локальные стили компонента */
</style>