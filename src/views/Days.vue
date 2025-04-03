
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getDays } from "../api/baseAPI";
import type { Day } from "../api/schemas";

const days = ref<Day[]>([]);

onMounted(async () => {
  await getDays(days);
});
</script>

<template>
  <h1 class="text-gray-900 mt-5 text-xl font-bold tracking-tight text-center mb-10">
    📆 Дни недели
  </h1>
  <div class="container mx-auto px-6 py-8">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="(day, index) in days" :key="day.id" 
           class="day-card dark:bg-gray-100"
           :style="{ animationDelay: `${index * 0.1}s` }">
        <p class="text-lg font-semibold text-gray-800 text-center">{{ day.day_name }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Анимация появления */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.day-card {
  /* background: #ffffff; */
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  opacity: 0;
  animation: fadeInUp 0.5s ease-out forwards;
  text-align: center;
}
</style>
