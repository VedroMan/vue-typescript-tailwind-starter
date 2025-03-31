/* Админ панель */
<template>
  <h1 class="text-gray-900 white:text-dark mt-5 text-base font-bold tracking-tight mb-10">
    Админ-панель👩‍💻
  </h1>

<nav>
  <RouterLink to="/admin/group-form">
    <h1 class="text-gray-900 white:text-dark mt-5 text-base font-medium tracking-tight mb-4">
      Группы
    </h1>
  </RouterLink>
  <RouterLink to="/admin/day-form">
    <h1 class="text-gray-900 white:text-dark mt-5 text-base font-medium tracking-tight mb-4">
      Дни
    </h1>
  </RouterLink>
  <RouterLink to="/admin/teacher-form">
    <h1 class="text-gray-900 white:text-dark mt-5 text-base font-medium tracking-tight mb-4">
      Педагоги
    </h1>
  </RouterLink>
  <RouterLink to="/admin/lesson-form">
    <h1 class="text-gray-900 white:text-dark mt-5 text-base font-medium tracking-tight mb-4">
      Уроки
    </h1>
  </RouterLink>
</nav>

</template>

<script setup lang="ts">


</script>

<style scoped>
h1 {
  text-align: center;
}
</style>