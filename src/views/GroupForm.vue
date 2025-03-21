<script setup>
import { ref } from "vue";

const groupName = ref("");
const message = ref("");

const addGroup = async () => {
  try {
    const response = await fetch("http://localhost:5005/groups/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ group_name: groupName.value }),
    });
    if (response.ok) {
      message.value = "Группа успешно добавлена!";
      groupName.value = "";
    } else {
      message.value = "Ошибка при добавлении.";
    }
  } catch (error) {
    message.value = "Ошибка сервера.";
  }
};
</script>

<template>
  <div class="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-xl font-bold mb-4">Добавить группу</h2>
    <input v-model="groupName" type="text" placeholder="Название группы" class="border p-2 w-full rounded" />
    <button @click="addGroup" class="bg-blue-500 text-white px-4 py-2 rounded mt-3">Добавить</button>
    <p v-if="message" class="mt-2 text-green-500">{{ message }}</p>
  </div>
</template>
