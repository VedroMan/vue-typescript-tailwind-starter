
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getTeachers, getLessonsByTeacher } from "../api/baseAPI";
import type { Teacher, Lesson } from "../api/schemas";

const teachers = ref<Teacher[]>([]);
const selectedLessons = ref<Lesson[]>([]);
const isModalOpen = ref(false);
const selectedTeacher = ref<string | null>(null);

onMounted(async () => {
  await getTeachers(teachers);
});

const openModal = async (teacher: Teacher) => {
  selectedTeacher.value = teacher.name;
  selectedLessons.value = await getLessonsByTeacher(teacher.id);
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedTeacher.value = null;
  selectedLessons.value = [];
};
</script>

<template>
  <h1 class="text-gray-900 mt-5 text-xl font-bold tracking-tight text-center mb-10">
    👩‍🏫 Преподаватели
  </h1>
  <div class="container mx-auto p-6">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="(teacher, index) in teachers" 
        :key="teacher.id" 
        @click="openModal(teacher)"
        class="teacher-card cursor-pointer dark:bg-gray-100"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        <h4 class="text-base font-semibold text-gray-800 text-center">
          {{ teacher.name }}
        </h4>
      </div>
    </div>
  </div>

  <!-- Модальное окно с уроками -->
  <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h2 class="text-base font-semibold text-gray-800 mb-4"> {{ selectedTeacher }}</h2>
      <div class="lessons-list">
        <ul v-if="selectedLessons.length">
          <li v-for="lesson in selectedLessons" :key="lesson.id" class="lesson-card">
          <p class="text-gray-900 font-medium">{{ lesson.subject }}</p>
          <p class="text-sm text-gray-600">{{ lesson.day.day_name }}</p>
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

.teacher-card {
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
