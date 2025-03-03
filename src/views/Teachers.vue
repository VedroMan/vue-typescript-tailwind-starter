<template>
  <div>
    <h1>Учителя 👨‍🏫</h1>
    <ul>
      <li v-for="teacher in teachers" :key="teacher.id">
        {{ teacher.name }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getTeachers } from "../api";
import type { Teacher } from "../api";

// Создаём реактивный массив
const teachers = ref<Teacher[]>([]);

onMounted(async () => {
  teachers.value = await getTeachers();
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
