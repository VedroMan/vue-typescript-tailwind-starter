<template>
  <h1 class="text-gray-900 white:text-dark mt-5 text-base font-bold tracking-tight ">Учителя 👩‍🏫</h1>
    <ul>
      <li v-for="teacher in teachers" :key="teacher.id">
        {{ teacher.name }}
      </li>
    </ul>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getTeachers } from "../api/baseAPI";
import type { Teacher } from "../api/schemas";

const teachers = ref<Teacher[]>([]);

onMounted(async () => {
  await getTeachers(teachers);
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
