/* TabBar */

<template>
    <nav class="fixed bottom-0 w-full bg-blue-800 flex justify-around py-3 border-">
        <router-link to="/" class="text-gray-600 text-white">Расписание 📚</router-link>
        <router-link to="/days" class="text-gray-600 text-white">Дни недели 📆</router-link>
        <router-link to="/teachers" class="text-gray-600 text-white">Учителя 👩‍🏫</router-link>
    </nav>
</template>

<script setup lang="ts">
// Логика компонента
</script>

<style scoped>
/* Локальные стили компонента */
</style>