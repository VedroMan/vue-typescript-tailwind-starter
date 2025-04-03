
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getDays, getLessonsByDay } from "../api/baseAPI";
import type { Day, Lesson } from "../api/schemas";

const days = ref<Day[]>([]);
const selectedLessons = ref<Lesson[]>([]);
const isModalOpen = ref(false);
const selectedDay = ref<string | null>(null);

onMounted(async () => {
  await getDays(days);
});

const openModal = async (day: Day) => {
  selectedDay.value = day.day_name;
  selectedLessons.value = await getLessonsByDay(day.id);
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedDay.value = null;
  selectedLessons.value = [];
};
</script>

<template>
  <h1 class="text-gray-900 mt-5 text-xl font-bold tracking-tight text-center mb-10">
    📆 Дни недели
  </h1>
  <div class="container mx-auto px-6 py-8">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div 
        v-for="(day, index) in days" 
        :key="day.id"
        @click="openModal(day)"
        class="day-card cursor-pointer dark:bg-gray-100"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        <p class="text-lg font-semibold text-gray-800 text-center">
          {{ day.day_name }}
        </p>
      </div>
    </div>
  </div>

  <!-- Модальное окно c уроками -->
  <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h2 class="text-lg font-semibold text-gray-800 mb-4">{{ selectedDay }}</h2>
      <div class="lessons-list">
        <ul v-if="selectedLessons.length">
          <li v-for="lesson in selectedLessons" :key="lesson.id" class="lesson-card">
          <p class="text-gray-900 font-medium">{{ lesson.subject }}</p>
          <p class="text-sm text-gray-600">{{ lesson.teacher.name }}</p>
          <p class="text-sm text-gray-600">⏰ {{ lesson.lesson_starts_time.slice(0, 5) }} - {{ lesson.lesson_ends_time.slice(0, 5) }}</p>
          <p class="text-sm text-gray-600">🚪 {{ lesson.classroom }}</p>
          </li>
        </ul>
        <p v-else class="text-gray-500 text-center">Нет уроков</p>
      </div>

      <button @click="closeModal" class="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition">
        Закрыть
      </button>
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
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  opacity: 0;
  animation: fadeInUp 0.5s ease-out forwards;
  text-align: center;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.modal-content {
  background: white;
  padding: 24px;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
  text-align: center;
  animation: fadeInUp 0.3s ease-out;
}

.lessons-list {
  overflow-y: auto;
  max-height: 50vh; 
  padding-right: 8px; 
}

.lesson-card {
  background: #f9f9f9;
  padding: 12px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 8px;
}
</style>