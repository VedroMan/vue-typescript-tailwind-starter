/* DayForm */

<script setup lang="ts">
import { faCheck, faXmark, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { getDays, getGroups, createDay, deleteDay, updateDay } from "../api/baseAPI";
import { ref, onMounted } from "vue";
import type { Day, Group } from "../api/schemas";

const days = ref<Day[]>([]);
const groups = ref<Group[]>([]);
const selectedDay = ref("");
const selectedGroup = ref("");
const message = ref("");
const errorMessage = ref("");
const loading = ref(false);

const daysForSelect = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

const fetchDays = async () => {
  try {
    loading.value = true;
    await getDays(days);
  } catch (error) {
    errorMessage.value = "Ошибка сервера при загрузке дней";
  } finally {
    loading.value = false;
  }
};

const fetchGroups = async () => {
  try {
    await getGroups(groups);
  } catch (error) {
    errorMessage.value = "Ошибка сервера при загрузке групп";
  }
};

const addDay = async () => {
  if (!selectedDay.value.trim() || !selectedGroup.value) return;
  loading.value = true;
  try {
    await createDay(selectedDay, selectedGroup, message, fetchDays);
  } catch (error) {
    errorMessage.value = "Ошибка сервера";
  } finally {
    loading.value = false;
  }
};

const removeDay = async (id: number) => {
  if (!confirm("Вы уверены, что хотите удалить этот день?")) return;
  loading.value = true;
  try {
    await deleteDay(id, fetchDays);
  } catch (error) {
    errorMessage.value = "Ошибка сервера при удалении";
  } finally {
    loading.value = false;
  }
};

const editDay = async (day: Day) => {
  if (!day.day_name.trim() || !day.group_id) return;
  loading.value = true;
  try {
    await updateDay(day, fetchDays);
  } catch (error) {
    errorMessage.value = "Ошибка сервера при обновлении";
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await fetchGroups();
  await fetchDays();
});
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 py-10">
    <h2 class="text-3xl font-bold text-center text-gray-900 mb-4">📆 Дни недели</h2>

    <div v-if="loading" class="text-center text-blue-500 text-lg animate-pulse mb-4">Загрузка данных...</div>
    <p v-if="errorMessage" class="text-center text-red-600 text-lg mb-4">{{ errorMessage }}</p>
    <p v-if="message" class="text-center text-green-600 text-lg mb-4">{{ message }}</p>

    <!-- Форма добавления дня -->
    <div class="bg-white border rounded-lg shadow p-6 mb-10 space-y-4">
      <h3 class="text-xl font-semibold text-gray-800">Добавить день</h3>

      <div class="grid grid-cols-1 md:grid-cols-1 gap-4">
        <div>
          <label class="text-sm text-gray-600">День</label>
          <select v-model="selectedDay" class="w-full border rounded p-2">
            <option disabled value="">Выберите день</option>
            <option v-for="(day, index) in daysForSelect" :key="index" :value="day">
              {{ day }}
            </option>
          </select>
        </div>

        <div>
          <label class="text-sm text-gray-600">Группа</label>
          <select v-model="selectedGroup" class="w-full border rounded p-2">
            <option disabled value="">Выберите группу</option>
            <option v-for="group in groups" :key="group.id" :value="group.id">
              {{ group.group_name }}
            </option>
          </select>
        </div>
      </div>

      <div class="text-center mt-4">
        <button
          @click="addDay"
          :disabled="loading"
          class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 hover:scale-105 transition"
        >
          Добавить
        </button>
      </div>
    </div>

    <div class="text-center text-gray-500 mb-6">
      Всего дней: <strong>{{ days.length }}</strong>
    </div>

    <!-- Карточки дней -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
      <div
        v-for="day in days"
        :key="day.id"
        class="bg-white border rounded-lg shadow-md p-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
      >
        <div v-if="day.editing" class="space-y-2">
          <input
            v-model="day.day_name"
            class="w-full border rounded px-2 py-1 focus:outline-none focus:ring focus:border-blue-400"
          />
          <div class="flex justify-end gap-2">
            <button
              @click="editDay(day)"
              :disabled="loading"
              class="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 transition"
            >
              <font-awesome-icon :icon="faCheck" />
            </button>
            <button
              @click="day.editing = false"
              class="bg-gray-400 text-white px-3 py-2 rounded hover:bg-gray-500 transition"
            >
              <font-awesome-icon :icon="faXmark" />
            </button>
          </div>
        </div>

        <div v-else class="flex flex-col justify-between h-full space-y-3">
          <div class="text-lg font-semibold text-gray-800">{{ day.day_name }}</div>
          <div class="text-sm text-gray-600">👥 {{ groups.find(g => g.id === day.group_id)?.group_name || "Группа неизвестна" }}</div>
          <div class="flex justify-end gap-2 mt-auto">
            <button
              @click="day.editing = true"
              :disabled="loading"
              class="bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600 transition"
            >
              <font-awesome-icon :icon="faPen" />
            </button>
            <button
              @click="removeDay(day.id)"
              :disabled="loading"
              class="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition"
            >
              <font-awesome-icon :icon="faTrash" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
select,
input {
  transition: border 0.3s, box-shadow 0.3s;
}

select:focus,
input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.3);
}
</style>
