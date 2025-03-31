<template>
  <h1 class="text-gray-900 white:text-dark mt-5 text-base font-bold tracking-tight ">Дни недели 📆</h1>
    <ul>
      <li v-for="day in days" :key="day.id">
        {{ day.day_name }}
      </li>
    </ul>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getDays } from "../api/baseAPI";
import type { Day } from "../api/schemas";

const days = ref<Day[]>([]);

onMounted(async () => {
  await getDays(days);
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
