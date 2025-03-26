<script setup lang="ts">
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { API_URL } from "../api/baseAPI";
import { ref, onMounted } from "vue";

const days = ref<{ id: number; day_name: string; group_id: number; editing: boolean }[]>([]);
const groups = ref<{ id: number; group_name: string }[]>([]);
const dayName = ref("");
const selectedGroup = ref<number | null>(null);
const message = ref("");


// Загрузка дней
const fetchDays = async () => {
  try {
    const response = await fetch(`${API_URL}/api/days/`);
    if (response.ok) {
      days.value = await response.json();
    } else {
      console.error("Ошибка загрузки дней");
    }
  } catch (error) {
    console.error("Ошибка сервера при загрузке дней", error);
  }
};

// Загрузка групп
const fetchGroups = async () => {
  try {
    const response = await fetch(`${API_URL}/api/groups/`);
    if (response.ok) {
      groups.value = await response.json();
    } else {
      console.error("Ошибка загрузки групп");
    }
  } catch (error) {
    console.error("Ошибка сервера при загрузке групп", error);
  }
};

// Добавление дня
const addDay = async () => {
  if (!dayName.value.trim() || !selectedGroup.value) return;

  try {
    const response = await fetch(`${API_URL}/api/days/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ day_name: dayName.value, group_id: selectedGroup.value }),
    });

    if (response.ok) {
      message.value = "День успешно добавлен!";
      dayName.value = "";
      selectedGroup.value = null;
      await fetchDays();
    } else {
      message.value = "Ошибка при добавлении.";
    }
  } catch (error) {
    message.value = "Ошибка сервера.";
  }
};

// Удаление дня
const deleteDay = async (id: number) => {
  if (!confirm("Вы уверены, что хотите удалить этот день?")) return;

  try {
    const response = await fetch(`${API_URL}/api/days/${id}`, { method: "DELETE" });
    if (response.ok) {
      await fetchDays();
    } else {
      console.error("Ошибка удаления дня");
    }
  } catch (error) {
    console.error("Ошибка сервера при удалении", error);
  }
};

// Обновление дня
const updateDay = async (day: { editing: boolean; id: number; day_name: string; group_id: number }) => {
  if (!day.day_name.trim() || !day.group_id) return;

  try {
    const response = await fetch(`${API_URL}/api/days/${day.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: day.id, day_name: day.day_name, group_id: day.group_id }),
    });

    if (response.ok) {
      day.editing = false;
      await fetchDays();
    } else {
      console.error("Ошибка обновления дня");
    }
  } catch (error) {
    console.error("Ошибка сервера при обновлении", error);
  }
};

onMounted(async () => {
  await fetchGroups();
  await fetchDays();
});
</script>

<template>
  <div class="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-xl font-bold mb-4">Управление днями</h2>

    <!-- Форма-->
    <div class="mb-4">
      <input v-model="dayName" type="text" placeholder="Название дня" class="border p-2 w-full rounded" />
      <select v-model="selectedGroup" class="border p-2 w-full rounded mt-2">
        <option disabled value="">Выберите группу</option>
        <option v-for="group in groups" :key="group.id" :value="group.id">{{ group.group_name }}</option>
      </select>
      <button @click="addDay" class="bg-blue-500 text-white px-4 py-2 rounded mt-3">Добавить</button>
      <p v-if="message" class="mt-2 text-green-500">{{ message }}</p>
    </div>

    <!-- День (группа) -->
    <ul class="space-y-2">
      <li v-for="day in days" :key="day.id" class="flex justify-between items-center p-2 border rounded">
        <div v-if="day.editing">
          <input v-model="day.day_name" class="border p-1 rounded mr-2" />
          <!-- <select v-model="day.group_id" class="border p-1 rounded">
            <option v-for="group in groups" :key="group.id" :value="group.id">{{ group.group_name }}</option>
          </select> -->
          <button @click="updateDay(day)" class="bg-green-500 text-white px-3 py-1 rounded">Сохранить</button>
          <button @click="day.editing = false" class="ml-2 bg-gray-500 text-white px-3 py-1 rounded">Отмена</button>
        </div>
        <div v-else class="flex items-center justify-between w-full">
          <span>{{ day.day_name }} ({{ groups.find(g => g.id === day.group_id)?.group_name || 'Неизвестно' }})</span>
          <div class="space-x-2">
            <button @click="day.editing = true" class="bg-yellow-500 text-white px-3 py-2 rounded">
              <font-awesome-icon :icon="faPen" />
            </button>
            <button @click="deleteDay(day.id)" class="bg-red-500 text-white px-3 py-2 rounded">
              <font-awesome-icon :icon="faTrash" />
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
