/* Телеграм пользователи приложения */

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getTelegramUsers } from "../api/baseAPI";
import type { User } from "../api/schemas";
import { faTelegram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const users = ref<User[]>([]);
const errorMessage = ref("");
const loading = ref(false);

const fetchTelegramUsers = async () => {
  try {
    loading.value = true;
    await getTelegramUsers(users);
  } catch (error) {
    errorMessage.value = "Ошибка сервера при загрузке пользователей с Telegram";
  } finally {
    loading.value = false;
  }
};

onMounted(fetchTelegramUsers);
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-center text-gray-900 mb-6">
      📱 Пользователи приложения
    </h1>

    <div v-if="!loading && users.length > 0" class="text-center mb-6">
      <p class="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium shadow">
        Всего зарегистрировано: <strong>{{ users.length }}</strong> пользователей
      </p>
    </div>

    <div v-if="loading" class="text-center text-blue-500 text-lg animate-pulse">
      Загрузка пользователей...
    </div>

    <p v-if="errorMessage" class="text-center text-red-600 text-lg">
      {{ errorMessage }}
    </p>

    <p v-if="!loading && users.length === 0" class="text-center text-gray-500">
      Пока ни одного пользователя не зарегистрировано.
    </p>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="user in users"
        :key="user.id"
        class="p-5 bg-white border border-gray-200 rounded-lg shadow hover:shadow-xl hover:scale-[1.03] transition-transform duration-300 relative overflow-hidden"
      >
        <div class="absolute top-4 right-4 text-blue-500 text-xl opacity-70">
          <font-awesome-icon :icon="faTelegram" />
        </div>

        <h2 class="text-xl font-semibold text-gray-800 mb-1">
          {{ user.first_name || "Имя неизвестно" }} {{ user.last_name || "" }}
        </h2>
        <p class="text-sm text-gray-600 italic mb-1">
          @{{ user.username || "нет юзернейма" }}
        </p>
        <p class="text-sm text-gray-500">
          Telegram ID: <span class="font-mono">{{ user.telegram_id }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 900px;
}
</style>
