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
  <div class="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md space-y-6">
    <h2 class="text-xl font-bold">Управление днями</h2>

    <div v-if="loading" class="text-center text-blue-500">Загрузка...</div>
    <p v-if="errorMessage" class="text-red-500 text-center">{{ errorMessage }}</p>
    <p v-if="message" class="text-green-500 text-center">{{ message }}</p>

    <div class="space-y-4">
      <label class="block text-sm font-medium text-gray-700">День</label>
      <select v-model="selectedDay" class="border p-2 w-full rounded">
        <option disabled value="">Выберите день</option>
        <option v-for="(day, index) in daysForSelect" :key="index" :value="day">{{ day }}</option>
      </select>

      <label class="block text-sm font-medium text-gray-700">Группа</label>
      <select v-model="selectedGroup" class="border p-2 w-full rounded">
        <option disabled value="">Выберите группу для дня</option>
        <option v-for="group in groups" :key="group.id" :value="group.id">{{ group.group_name }}</option>
      </select>

      <button @click="addDay" :disabled="loading" class="w-full bg-blue-500 text-white px-4 py-2 rounded">
        Добавить
      </button>
    </div>

    <ul class="space-y-3">
      <li v-for="day in days" :key="day.id" class="flex justify-between items-center p-2 border rounded">
        <div v-if="day.editing" class="flex w-full gap-2">
          <input v-model="day.day_name" class="border p-1 rounded w-2/3" />
          <button @click="editDay(day)" :disabled="loading" class="bg-green-500 text-white px-4 py-2 rounded">
            <font-awesome-icon :icon="faCheck" />
          </button>
          <button @click="day.editing = false" class="bg-gray-500 text-white px-4 py-2 rounded">
            <font-awesome-icon :icon="faXmark" />
          </button>
        </div>
        <div v-else class="flex justify-between w-full items-center">
          <span>{{ day.day_name }} ({{ groups.find(g => g.id === day.group_id)?.group_name || 'Неизвестно' }})</span>
          <div class="flex gap-2">
            <button @click="day.editing = true" :disabled="loading" class="bg-yellow-500 text-white px-3 py-2 rounded">
              <font-awesome-icon :icon="faPen" />
            </button>
            <button @click="removeDay(day.id)" :disabled="loading" class="bg-red-500 text-white px-3 py-2 rounded">
              <font-awesome-icon :icon="faTrash" />
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
