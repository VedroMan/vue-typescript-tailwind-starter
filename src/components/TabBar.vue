/* TabBar */

<template>
    <nav class="fixed bottom-0 w-full bg-blue-800 flex justify-around py-3 border-">
        <router-link to="/days" class="text-gray-600 text-white text-2xl">
            <font-awesome-icon :icon="faCalendar" />
        </router-link>
        <router-link to="/" class="text-gray-600 text-white text-2xl">
            <font-awesome-icon :icon="faHome" />
        </router-link>
        <router-link to="/teachers" class="text-gray-600 text-white text-2xl">
            <font-awesome-icon :icon="faChalkboardTeacher" />
        </router-link>
    </nav>
</template>

<script setup lang="ts">
import { faHome, faCalendar, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';

</script>

<style scoped>
/* Локальные стили компонента */
</style>