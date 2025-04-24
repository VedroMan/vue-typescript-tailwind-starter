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
  <div class="max-w-4xl mx-auto px-4 py-10">
    <h2 class="text-3xl font-bold text-center text-gray-900 mb-4">👥 Группы</h2>

    <div v-if="loading" class="text-center text-blue-500 text-lg animate-pulse mb-4">Загрузка данных...</div>
    <p v-if="errorMessage" class="text-center text-red-600 text-lg mb-4">{{ errorMessage }}</p>
    <p v-if="message" class="text-center text-green-600 text-lg mb-4">{{ message }}</p>

    <div class="bg-white border rounded-lg shadow p-6 mb-6 text-center space-y-4">
      <input
        v-model="groupName"
        placeholder="Введите название группы"
        class="w-full sm:w-2/3 mx-auto block px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring focus:border-blue-300 transition"
      />
      <button
        @click="addGroup"
        :disabled="loading"
        class="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition hover:scale-105"
      >
      Добавить
      </button>
    </div>

    <div class="text-center text-gray-500 mb-6">
      Всего групп: <strong>{{ groups.length }}</strong>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
      <div
        v-for="group in groups"
        :key="group.id"
        class="bg-white border rounded-lg shadow-md p-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
      >
        <div v-if="group.editing" class="space-y-2">
          <input
            v-model="group.group_name"
            class="w-full border rounded px-2 py-1 focus:outline-none focus:ring focus:border-blue-400"
          />
          <div class="flex justify-end gap-2">
            <button
              @click="editGroup(group)"
              :disabled="loading"
              class="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 transition"
            >
              <font-awesome-icon :icon="faCheck" />
            </button>
            <button
              @click="group.editing = false"
              class="bg-gray-400 text-white px-3 py-2 rounded hover:bg-gray-500 transition"
            >
              <font-awesome-icon :icon="faXmark" />
            </button>
          </div>
        </div>

        <div v-else class="flex flex-col justify-between h-full space-y-3">
          <div class="text-blue-600 text-2xl flex items-center gap-2">
            <span class="text-lg font-semibold text-gray-800">{{ group.group_name }}</span>
          </div>
          <div class="flex justify-end gap-2 mt-auto">
            <button
              @click="group.editing = true"
              :disabled="loading"
              class="bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600 transition"
            >
              <font-awesome-icon :icon="faPen" />
            </button>
            <button
              @click="removeGroup(group.id)"
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
