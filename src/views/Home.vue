<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getLessonsForDayFilter, filterLessonsByDay } from "../api/baseAPI";
import type { Lesson } from "../api/schemas";

const lessons = ref<Record<string, Lesson[]>>({}); // объект ключ-[значение]

onMounted(async () => {
    const allLessons: Lesson[] = await getLessonsForDayFilter(); 
    lessons.value = filterLessonsByDay(allLessons);
});
</script>

<template>
    <h1 class="text-gray-900 mt-5 text-xl font-bold tracking-tight text-center mb-10">
        📚 Расписание уроков
    </h1>
    <div class="container mx-auto px-6 py-8">
        <div v-for="[day, dayLessons] in Object.entries(lessons)" :key="day" class="mb-8">
            <h2 class="text-lg font-semibold text-blue-600 border-l-4 border-blue-500 pl-4 mb-4">
                {{ day }}
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="(lesson, index) in dayLessons" :key="lesson.id" 
                     class="lesson-card"
                     :style="{ animationDelay: `${index * 0.1}s` }">
                    <h3 class="text-lg font-semibold text-gray-800">{{ lesson.subject }}</h3>
                    <p class="text-gray-600 mt-2"><strong>{{ lesson.teacher.name }}</strong></p>
                    <p class="text-gray-600 mt-2">⏰ {{ lesson.lesson_starts_time.slice(0, 5) }} - {{ lesson.lesson_ends_time.slice(0, 5) }}</p>
                    <p class="text-gray-600 mt-2">🚪 <strong>{{ lesson.classroom }}</strong></p>
                </div>
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

/* Карточка урока */
.lesson-card {
    background: #ffffff;
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
    opacity: 0;
    animation: fadeInUp 0.5s ease-out forwards;
}
</style>