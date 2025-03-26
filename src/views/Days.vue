<template>
  <div class="flex flex-col min-h-screen">
    <main class="grow">
      <h1 class="text-gray-900 white:text-dark mt-5 text-base font-bold tracking-tight ">Дни недели 📆</h1>
      <ul>
        <li v-for="day in days" :key="day.id">
        {{ day.day_name }}
        </li>
      </ul>
    </main>
  </div>

  <footer class="text-gray-400 white:text-dark mt-10 mb-10 text-xs py-4 font-medium tracking-tight text-center">
    <p>Produced by Tim Zykov</p>
  </footer>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getDays } from "../api/baseAPI";
import type { Day } from "../api/schemas";

// Создаём реактивный массив
const days = ref<Day[]>([]);

onMounted(async () => {
  days.value = await getDays();
});
</script>

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
