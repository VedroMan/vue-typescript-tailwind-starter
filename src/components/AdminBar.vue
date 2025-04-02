/* AdminBar */

<template>
    <nav class="fixed left-0 top-0 h-screen w-20 bg-blue-800 flex flex-col items-center py-12 space-y-6">
        <router-link to="/" class="text-gray-600 text-white text-3xl">
            <font-awesome-icon :icon="faHome" />
        </router-link>
        <router-link to="/admin/" class="text-gray-600 text-white text-3xl">
            <font-awesome-icon :icon="faUserTie" />
        </router-link>
        <router-link to="/admin/group-form" class="text-gray-600 text-white text-3xl">
            <font-awesome-icon :icon="faUsers" />
        </router-link>
        <router-link to="/admin/day-form" class="text-gray-600 text-white text-3xl">
            <font-awesome-icon :icon="faCalendar" />
        </router-link>
        <router-link to="/admin/teacher-form" class="text-gray-600 text-white text-3xl">
            <font-awesome-icon :icon="faChalkboardTeacher" />
        </router-link>
        <router-link to="/admin/lesson-form" class="text-gray-600 text-white text-3xl">
            <font-awesome-icon :icon="faClipboardList" />
        </router-link>
    </nav>
</template>

<script setup lang="ts">
import { faUserTie, faUsers, faCalendar, faChalkboardTeacher, faClipboardList, faHome } from '@fortawesome/free-solid-svg-icons';

</script>

<style scoped>
nav a {
    transition: transform 0.2s ease-in-out;
}

nav a:hover {
    transform: scale(1.2);
}
</style>