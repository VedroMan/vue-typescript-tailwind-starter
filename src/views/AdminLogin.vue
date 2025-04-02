/* Admin Login */

<template>
    <div class="flex justify-center items-center min-h-screen bg-white-1000">
      <div class="w-full max-w-sm p-6 bg-white light:bg-gray-800 shadow-md rounded-lg">
        <h2 class="text-center text-xl font-bold text-gray-900 light:text-white">🔑 Вход в админ-панель</h2>
  
        <form @submit.prevent="login" class="mt-6">
          <label class="block">
            <span class="text-gray-700 light:text-gray-300">Пароль</span>
            <input
              type="password"
              v-model="password"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 light:border-gray-600 light:bg-gray-700 light:text-white"
              placeholder="Введите пароль"
              required
            />
          </label>
  
          <button
            type="submit"
            class="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
            Войти
          </button>
        </form>
  
        <p v-if="errorMessage" class="text-red-500 text-sm mt-3 text-center">{{ errorMessage }}</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { ADMIN_PASS } from "../config";
  
  const router = useRouter();
  const password = ref("");
  const errorMessage = ref("");
  
  const login = () => {
    if (password.value === ADMIN_PASS) {
      localStorage.setItem("admin_password", password.value);
      router.push("/admin");
    } else {
      errorMessage.value = "❌ Неверный пароль!";
      password.value = "";
    }
  };
  </script>
  