
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getTeachers } from "../api/baseAPI";
import type { Teacher } from "../api/schemas";

const teachers = ref<Teacher[]>([]);

onMounted(async () => {
  await getTeachers(teachers);
});
</script>

<template>
  <h1 class="text-gray-900 mt-5 text-xl font-bold tracking-tight text-center mb-10">
    👩‍🏫 Преподаватели
  </h1>
  <div class="container mx-auto p-6">
    <div v-if="teachers.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="(teacher, index) in teachers" 
        :key="teacher.id" 
        class="teacher-card dark:bg-gray-100"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        <h4 class="text-base font-semibold text-gray-800 text-center">
          {{ teacher.name }}
        </h4>
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

.teacher-card {
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
