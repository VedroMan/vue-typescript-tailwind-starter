/* Админ панель */

<template>
  <div class="container mx-auto text-center">
    <h1 class="text-gray-900 dark:text-black mt-5 text-2xl font-bold tracking-tight">
      Добро пожаловать в Админ-панель 👩‍💻
    </h1>
    <p class="text-gray-800 dark:text-gray-400 mt-3 text-lg pb-10">
      Здесь можно управлять группами, днями, преподавателями и уроками.<br />
      Индивидуальными занятими(в разработке).
    </p>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
      <RouterLink
        v-for="(item, index) in adminLinks"
        :key="index"
        :to="item.path"
        class="group block p-6 bg-white light:bg-gray-800 shadow-lg rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
        <div class="text-4xl mb-3 text-blue-600 dark:text-blue-400">
          <font-awesome-icon :icon="item.icon" />
        </div>
        <h2 class="text-gray-900 dark:text-black text-lg font-medium tracking-tight">
          {{ item.label }}
        </h2>
      </RouterLink>
    </div>
    <button 
    @click="logout" 
    class="absolute top-5 right-5 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300 hover:scale-105">
    🚪 Выйти
    </button>

    <div class="mt-10 p-6 bg-gray-100 light:bg-gray-800 rounded-lg shadow">
      <h2 class="text-gray-900 dark:text-black text-xl font-bold">Подсказка</h2>
      <p class="text-gray-600 dark:text-gray-600 mt-3 text-left">
        👯 <strong>Группы</strong> – создавайте и редактируйте группы студентов.<br />
        🗓️ <strong>Дни</strong> – создавайте дни и привязывайте их к группам<br />
        👩‍🏫 <strong>Преподаватели</strong> – добавляйте и редактируйте данные преподавателей.<br />
        📚 <strong>Уроки</strong> – создавайте уроки и привязывайте их к преподавателям и группам.<br />
      </p>
    </div>

  </div>
</template>

<script setup lang="ts">
import { faUsers, faCalendar, faChalkboardTeacher, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from "vue-router";

const router = useRouter();

const adminLinks = [
  { label: "Группы", path: "/admin/group-form", icon: faUsers },
  { label: "Дни", path: "/admin/day-form", icon: faCalendar },
  { label: "Преподаватели", path: "/admin/teacher-form", icon: faChalkboardTeacher },
  { label: "Уроки", path: "/admin/lesson-form", icon: faClipboardList },
];

const logout = () => {
  localStorage.removeItem("admin_password");
  router.push("/admin-login");
};
</script>

<style scoped>
.container {
  max-width: 900px;
}
</style>
