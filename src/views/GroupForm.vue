/* GroupForm */

<script setup lang="ts">
import { faPen, faTrash, faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { getGroups, createGroup, deleteGroup, updateGroup } from "../api/baseAPI";
import type { Group } from "../api/schemas";
import { ref, onMounted } from "vue";

const groups = ref<Group[]>([]);
const groupName = ref("");
const message = ref("");
const errorMessage = ref("");
const loading = ref(false);

const fetchGroups = async () => {
  try {
    loading.value = true;
    await getGroups(groups);
  } catch (error) {
    errorMessage.value = "Ошибка сервера при загрузке групп";
  } finally {
    loading.value = false;
  }
};

const addGroup = async () => {
  if (!groupName.value.trim()) return;
  loading.value = true;
  try {
    await createGroup(groupName, message, fetchGroups);
  } catch (error) {
    errorMessage.value = "Ошибка сервера";
  } finally {
    loading.value = false;
  }
};

const removeGroup = async (id: number) => {
  if (!confirm("Вы уверены, что хотите удалить эту группу?")) return;
  loading.value = true;
  try {
    await deleteGroup(id, fetchGroups);
  } catch (error) {
    errorMessage.value = "Ошибка сервера при удалении";
  } finally {
    loading.value = false;
  }
};

const editGroup = async (group: Group) => {
  if (!group.group_name.trim()) return;
  loading.value = true;
  try {
    await updateGroup(group, fetchGroups);
  } catch (error) {
    errorMessage.value = "Ошибка сервера при обновлении";
  } finally {
    loading.value = false;
  }
};

onMounted(fetchGroups);
</script>

<template>
  <div class="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md space-y-6">
    <h2 class="text-xl font-bold">Управление группами</h2>

    <div v-if="loading" class="text-center text-blue-500">Загрузка...</div>
    <p v-if="errorMessage" class="text-red-500 text-center">{{ errorMessage }}</p>
    <p v-if="message" class="text-green-500 text-center">{{ message }}</p>

    <div class="space-y-4">
      <label class="block text-sm font-medium text-gray-700">Группа</label>
      <input v-model="groupName" class="border p-2 w-full rounded" placeholder="Введите название" />

      <button @click="addGroup" :disabled="loading" class="w-full bg-blue-500 text-white px-4 py-2 rounded">
        Добавить
      </button>
    </div>

    <ul class="space-y-3">
      <li v-for="group in groups" :key="group.id" class="flex justify-between items-center p-2 border rounded">
        <div v-if="group.editing" class="flex w-full gap-2">
          <input v-model="group.group_name" class="border p-1 rounded w-2/3" />
          <button @click="editGroup(group)" :disabled="loading" class="bg-green-500 text-white px-4 py-2 rounded">
            <font-awesome-icon :icon="faCheck" />
          </button>
          <button @click="group.editing = false" class="bg-gray-500 text-white px-4 py-2 rounded">
            <font-awesome-icon :icon="faXmark" />
          </button>
        </div>
        <div v-else class="flex justify-between w-full items-center">
          <span>{{ group.group_name }}</span>
          <div class="flex gap-2">
            <button @click="group.editing = true" :disabled="loading" class="bg-yellow-500 text-white px-3 py-2 rounded">
              <font-awesome-icon :icon="faPen" />
            </button>
            <button @click="removeGroup(group.id)" :disabled="loading" class="bg-red-500 text-white px-3 py-2 rounded">
              <font-awesome-icon :icon="faTrash" />
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
