<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getLessons, groupLessonsByDay } from "../api";
import type { Lesson } from "../api";

const lessons = ref<Record<string, Lesson[]>>({});

onMounted(async () => {
    const allLessons = await getLessons();
    lessons.value = groupLessonsByDay(allLessons);
});

</script>

<template>
    <!-- header -->
    <h1 class="text-gray-900 white:text-dark mt-5 text-base font-bold tracking-tight">Расписание уроков🗓️</h1>
    <br>
    <div v-for="[day, dayLessons] in Object.entries(lessons)" :key="day">
        <h2 class="text-lg font-bold mt-4">{{ day }}</h2>
        <ul>
            <li v-for="lesson in dayLessons" :key="lesson.id"
                class="text-gray-900 white:text-dark mt-5 text-base font-medium tracking-tight">
                <div class="bg-white white:bg-gray-800 rounded-lg px-6 py-4 shadow-md">
                    <p><strong>{{ lesson.subject }}</strong> – {{ lesson.teacher }}</p>
                    <p>⏰ {{ lesson.lesson_starts_time.slice(0, 5) }} - {{ lesson.lesson_ends_time.slice(0, 5) }}</p>
                    <p>🚪 {{ lesson.classroom }}</p>
                </div>
            </li>
        </ul>
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
</style>
