<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getLessons } from "../api";
import type { Lesson } from "../api";

const lessons = ref<Lesson[]>([]);

onMounted(async () => {
    lessons.value = await getLessons();
});
</script>

<template>
    <!-- header -->
    <h1>Расписание:</h1>
    <br>
    <div class="bg-white white:bg-gray-800 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5">
        <ul>
            <li v-for="lesson in lessons" :key="lesson.id" class="text-gray-900 white:text-dark mt-5 text-base font-medium tracking-tight ">
                {{ lesson.day }}<br>
                {{ lesson.subject }} – {{ lesson.teacher }}.<br> 
                Время: {{ lesson.lesson_starts_time }}/{{ lesson.lesson_ends_time }}.<br>
                Кабинет: {{ lesson.classroom }}.<br>
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
li {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}
</style>
