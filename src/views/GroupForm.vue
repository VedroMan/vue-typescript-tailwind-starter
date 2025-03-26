/* GroupForm.vue */

<script setup lang="ts">
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { API_URL } from "../api/baseAPI";

import { ref, onMounted } from "vue";

const groups = ref<{ id: number; group_name: string; editing: boolean }[]>([]);
const groupName = ref("");
const message = ref("");

// Функция для загрузки групп с сервера
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

// Функция добавления новой группы
const addGroup = async () => {
  if (!groupName.value.trim()) return;

  try {
    const response = await fetch(`${API_URL}/api/groups/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ group_name: groupName.value }),
    });

    if (response.ok) {
      message.value = "Группа успешно добавлена!";
      groupName.value = "";
      await fetchGroups();
    } else {
      message.value = "Ошибка при добавлении.";
    }
  } catch (error) {
    message.value = "Ошибка сервера.";
  }
};

// Функция удаления группы
const deleteGroup = async (id: number) => {
  if (!confirm("Вы уверены, что хотите удалить эту группу?")) return;

  try {
    const response = await fetch(`${API_URL}/api/groups/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      await fetchGroups();
    } else {
      console.error("Ошибка удаления группы");
    }
  } catch (error) {
    console.error("Ошибка сервера при удалении", error);
  }
};

// Функция обновления группы
const updateGroup = async (group: {
  editing: boolean; 
  id: number; 
  group_name: string 
}) => {
  if (!group.group_name.trim()) return;

  try {
    const response = await fetch(`${API_URL}/api/groups/${group.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        id: group.id,
        group_name: group.group_name
       }),
    });

    if (response.ok) {
      group.editing = false;
      await fetchGroups();
    } else {
      console.error("Ошибка обновления группы");
    }
  } catch (error) {
    console.error("Ошибка сервера при обновлении", error);
  }
};

// Загружаем группы при монтировании
onMounted(fetchGroups);
</script>

<template>
  <div class="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-xl font-bold mb-4">Управление группами</h2>

    <!-- Форма для добавления группы -->
    <div class="mb-4">
      <input
        v-model="groupName"
        type="text"
        placeholder="Название группы"
        class="border p-2 w-full rounded"
      />
      <button @click="addGroup" class="bg-blue-500 text-white px-4 py-2 rounded mt-3">
        Добавить
      </button>
      <p v-if="message" class="mt-2 text-green-500">{{ message }}</p>
    </div>

    <!-- Список групп -->
    <ul class="space-y-2">
      <li v-for="group in groups" :key="group.id" class="flex justify-between items-center p-2 border rounded">
        <div v-if="group.editing">
          <input v-model="group.group_name" class="border p-1 rounded mr-2" />
          <button @click="updateGroup(group)" class="bg-green-500 text-white px-3 py-1 rounded">
            Сохранить
          </button>
          <button @click="group.editing = false" class="ml-2 bg-gray-500 text-white px-3 py-1 rounded">
            Отмена
          </button>
        </div>
        <div v-else class="flex items-center justify-between w-full">
          <span>{{ group.group_name }}</span>
          <div class="space-x-2">
            <button @click="group.editing = true" class="bg-yellow-500 text-white px-3 py-2 rounded">
              <font-awesome-icon :icon="faPen" />
            </button>
            <button @click="deleteGroup(group.id)" class="bg-red-500 text-white px-3 py-2 rounded">
              <font-awesome-icon :icon="faTrash" />
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
