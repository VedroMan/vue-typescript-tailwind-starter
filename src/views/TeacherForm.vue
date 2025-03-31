/* TeacherForm */

<script setup lang="ts">
import { faCheck, faXmark, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createTeacher, deleteTeacher, getTeachers, updateTeacher } from "../api/baseAPI";
import { ref, onMounted } from "vue";
import type { Teacher } from "../api/schemas";

const teachers = ref<Teacher[]>([]);
const teacherName = ref("");
const message = ref("");
const errorMessage = ref("");
const loading = ref(false);

const fetchTeachers = async () => {
  try {
    loading.value = true;
    await getTeachers(teachers);
  } catch (error) {
    errorMessage.value = "Ошибка сервера при загрузке учителей";
  } finally {
    loading.value = false;
  }
};

const addTeacher = async () => {
  if (!teacherName.value.trim()) return;
  loading.value = true;
  try {
    await createTeacher(teacherName, message, fetchTeachers);
  } catch (error) {
    errorMessage.value = "Ошибка сервера";
  } finally {
    loading.value = false;
  }
};

const removeTeacher = async (id: number) => {
  if (!confirm("Вы уверены, что хотите удалить этого учителя?")) return;
  loading.value = true;
  try {
    await deleteTeacher(id, fetchTeachers);
  } catch (error) {
    errorMessage.value = "Ошибка сервера при удалении";
  } finally {
    loading.value = false;
  }
};

const editTeacher = async (teacher: Teacher) => {
  if (!teacher.name.trim()) return;
  loading.value = true;
  try {
    await updateTeacher(teacher, fetchTeachers);
  } catch (error) {
    errorMessage.value = "Ошибка сервера при обновлении";
  } finally {
    loading.value = false;
  }
};

onMounted(fetchTeachers);
</script>

<template>
  <div class="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md space-y-6">
    <h2 class="text-xl font-bold">Управление учителями</h2>

    <div v-if="loading" class="text-center text-blue-500">Загрузка...</div>
    <p v-if="errorMessage" class="text-red-500 text-center">{{ errorMessage }}</p>
    <p v-if="message" class="text-green-500 text-center">{{ message }}</p>

    <div class="space-y-4">
      <label class="block text-sm font-medium text-gray-700">Имя учителя</label>
      <input v-model="teacherName" class="border p-2 w-full rounded" placeholder="Введите имя" />

      <button @click="addTeacher" :disabled="loading" class="w-full bg-blue-500 text-white px-4 py-2 rounded">
        Добавить
      </button>
    </div>

    <ul class="space-y-3">
      <li v-for="teacher in teachers" :key="teacher.id" class="flex justify-between items-center p-2 border rounded">
        <div v-if="teacher.editing" class="flex w-full gap-2">
          <input v-model="teacher.name" class="border p-1 rounded w-2/3" />
          <button @click="editTeacher(teacher)" :disabled="loading" class="bg-green-500 text-white px-4 py-2 rounded">
            <font-awesome-icon :icon="faCheck" />
          </button>
          <button @click="teacher.editing = false" class="bg-gray-500 text-white px-4 py-2 rounded">
            <font-awesome-icon :icon="faXmark" />
          </button>
        </div>
        <div v-else class="flex justify-between w-full items-center">
          <span>{{ teacher.name }}</span>
          <div class="flex gap-2">
            <button @click="teacher.editing = true" :disabled="loading" class="bg-yellow-500 text-white px-3 py-2 rounded">
              <font-awesome-icon :icon="faPen" />
            </button>
            <button @click="removeTeacher(teacher.id)" :disabled="loading" class="bg-red-500 text-white px-3 py-2 rounded">
              <font-awesome-icon :icon="faTrash" />
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
