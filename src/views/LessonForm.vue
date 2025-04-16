<script setup lang="ts">
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { getDays, getTeachers, getLessons, createLesson, deleteLesson, updateLesson } from "../api/baseAPI";
import { ref, onMounted, computed, watch } from "vue";
import type { Day, Lesson, Teacher } from "../api/schemas";

const lessons = ref<Lesson[]>([]);
const teachers = ref<Teacher[]>([]);
const days = ref<Day[]>([]);

const showEditModal = ref(false);
const lessonToEdit = ref<Lesson | null>(null);

const subjects = [
  "Математика", "Физика", "Русский язык", "Белорусский язык",
  "Русская литература", "Бел Литература", "Английский язык",
  "Биология", "Химия", "География", "Сольфеджио", "ПДД",
  "Эл. теория музыки", "Хоровой класс", "Хороведение", "Физ-ра",
  "Информатика", "МКТ", "История", "Обществоведение",
  "Классный час", "Эл. теория музыки/Хороведение", 
  "Сольфеджио/Эл. теория музыки",
  "Отсутствует", "Другое"
];

const startTimes = [
  "08:30", "09:25", "10:20", "11:15", "12:10",
  "13:05", "14:10", "15:05", "16:00", "16:55",
  "17:50", "18:45"
];

const selectedSubject = ref("");
const selectedDay = ref("");
const selectedTeacher = ref("");
const selectedStartTime = ref("");
const classroom = ref("");

const message = ref("");
const errorMessage = ref("");
const loading = ref(false);


// Расчёт времени окончания урока

const getEndTime = (startTime: string): string => {
  const [hours, minutes] = startTime.split(":").map(Number);
  const end = new Date();
  end.setHours(hours, minutes + 45);
  return `${end.getHours().toString().padStart(2, "0")}:${end.getMinutes().toString().padStart(2, "0")}`;
};

const fetchLessons = async () => {
  try {
    loading.value = true;
    await getLessons(lessons);
  } catch (error) {
    errorMessage.value = "Ошибка сервера при загрузке занятий";
  } finally {
    loading.value = false;
  }
};

const fetchTeachers = async () => {
  try {
    await getTeachers(teachers);
  } catch (error) {
    errorMessage.value = "Ошибка сервера при загрузке учителей";
  }
};

const fetchDays = async () => {
  try {
    await getDays(days);
  } catch (error) {
    errorMessage.value = "Ошибка сервера при загрузке дней";
  }
};

const calculateEndTime = computed(() => {
  if (!selectedStartTime.value) return "";
  return getEndTime(selectedStartTime.value);
});

const addLesson = async () => {
  if (!selectedSubject.value || !selectedDay.value || !selectedTeacher.value || !selectedStartTime.value) {
    errorMessage.value = "Необходимо заполнить все поля (кроме кабинета)";
    return;
  }

  if (classroom.value === "") {
    classroom.value = "Отсутствует";
  }

  loading.value = true;
  try {
    await createLesson(
      selectedSubject,
      classroom,
      selectedStartTime,
      calculateEndTime,
      selectedDay,
      selectedTeacher,
      message,
      fetchLessons
    );
  } catch (error) {
    errorMessage.value = "Ошибка сервера";
  } finally {
    loading.value = false;
  }
};

const removeLesson = async (id: number) => {
  if (!confirm("Вы уверены, что хотите удалить этот урок?")) return;
  loading.value = true;
  try {
    await deleteLesson(id, fetchLessons);
  } catch (error) {
    errorMessage.value = "Ошибка сервера";
  } finally {
    loading.value = false;
  }
};

const editLesson = async (lesson: Lesson) => {
  if (!lesson.subject || !lesson.classroom || !lesson.day || !lesson.lesson_starts_time || !lesson.teacher) return;
  loading.value = true;

  try {
    await updateLesson(lesson, fetchLessons);
  } catch (error) {
    errorMessage.value = "Ошибка сервера при обновлении";
  } finally {
    loading.value = false;
  }
};

// Если изменится время начала урока, то за ним последует расчёт конца урока

watch(
  () => lessonToEdit.value?.lesson_starts_time,
  (newStart) => {
    if (!newStart || !lessonToEdit.value) return;
    lessonToEdit.value.lesson_ends_time = getEndTime(newStart);
  }
);

const openEditModal = (lesson: Lesson) => {
  lessonToEdit.value = {
    ...lesson,
    day: { ...lesson.day },
    teacher: { ...lesson.teacher }
  };
  showEditModal.value = true;
};

const closeEditModal = () => {
  showEditModal.value = false;
  lessonToEdit.value = null;
};

const submitLessonUpdate = async () => {
  if (!lessonToEdit.value) return;

  const dayObj = days.value.find(d => d.id === lessonToEdit.value!.day.id);
  const teacherObj = teachers.value.find(t => t.id === lessonToEdit.value!.teacher.id);

  if (!dayObj || !teacherObj) {
    errorMessage.value = "Неверный преподаватель или день";
    return;
  }

  const updatedLesson: Lesson = {
    ...lessonToEdit.value,
    day: dayObj,
    teacher: teacherObj
  };

  loading.value = true;
  try {
    await editLesson(updatedLesson);
    showEditModal.value = false;
  } catch (error) {
    errorMessage.value = "Ошибка при сохранении изменений";
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await fetchTeachers();
  await fetchDays();
  await fetchLessons();
});
</script>

<template>
  <div class="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md space-y-6">
    <h2 class="text-xl font-bold">Управление занятиями</h2>

    <div v-if="loading" class="text-center text-blue-500">Загрузка...</div>
    <p v-if="errorMessage" class="text-red-500 text-center">{{ errorMessage }}</p>
    <p v-if="message" class="text-green-500 text-center">{{ message }}</p>

    <div class="space-y-4">
      <label class="block text-sm font-medium text-gray-700">Предмет</label>
      <select v-model="selectedSubject" class="border p-2 w-full rounded">
        <option disabled value="">Выберите предмет</option>
        <option v-for="subject in subjects" :key="subject" :value="subject">{{ subject }}</option>
      </select>

      <label class="block text-sm font-medium text-gray-700">День</label>
      <select v-model="selectedDay" class="border p-2 w-full rounded">
        <option disabled value="">Выберите день</option>
        <option v-for="day in days" :key="day.id" :value="day.id">{{ day.day_name }}</option>
      </select>

      <label class="block text-sm font-medium text-gray-700">Преподаватель</label>
      <select v-model="selectedTeacher" class="border p-2 w-full rounded">
        <option disabled value="">Выберите преподавателя</option>
        <option v-for="teacher in teachers" :key="teacher.id" :value="teacher.id">{{ teacher.name }}</option>
      </select>

      <label class="block text-sm font-medium text-gray-700">Время начала</label>
      <select v-model="selectedStartTime" class="border p-2 w-full rounded">
        <option disabled value="">Выберите время</option>
        <option v-for="time in startTimes" :key="time" :value="time">{{ time }}</option>
      </select>
      <p>Время окончания: <strong>{{ calculateEndTime }}</strong></p>

      <label class="block text-sm font-medium text-gray-700">Кабинет</label>
      <input v-model="classroom" class="border p-2 w-full rounded" placeholder="Введите кабинет" />

      <button @click="addLesson" :disabled="loading" class="w-full bg-blue-500 text-white px-4 py-2 rounded">
        Добавить занятие
      </button>
    </div>

    <ul class="space-y-3">
      <li v-for="lesson in lessons" :key="lesson.id" class="flex justify-between items-center p-2 border rounded">
        <span>
          {{ lesson.subject }} - 
          {{ days.find(d => d.id === lesson.day.id)?.day_name || 'Неизвестно' }} - 
          {{ teachers.find(t => t.id === lesson.teacher.id)?.name || 'Неизвестно' }} 
          ({{ lesson.lesson_starts_time.slice(0, 5) }} - {{ lesson.lesson_ends_time.slice(0, 5) }}) - {{ lesson.classroom }}
        </span>
        <div class="flex gap-2">
          <button @click="openEditModal(lesson)" :disabled="loading" class="bg-yellow-500 text-white px-3 py-2 rounded">
            <font-awesome-icon :icon="faPen" />
          </button>
          <button @click="removeLesson(lesson.id)" :disabled="loading" class="bg-red-500 text-white px-3 py-2 rounded">
            <font-awesome-icon :icon="faTrash" />
          </button>
        </div>
      </li>
    </ul>
  </div>

  <!-- Модальное окно редактирования -->
  <div v-if="showEditModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white p-6 rounded shadow-lg w-full max-w-md space-y-4 relative" v-if="lessonToEdit">
      <h3 class="text-lg font-bold">Редактировать занятие</h3>

      <label class="block text-sm">Предмет</label>
      <select v-model="lessonToEdit.subject" class="w-full border p-2 rounded">
        <option v-for="subject in subjects" :key="subject" :value="subject">{{ subject }}</option>
      </select>

      <label class="block text-sm">День</label>
      <select v-model="lessonToEdit.day.id" class="w-full border p-2 rounded">
        <option v-for="day in days" :key="day.id" :value="day.id">{{ day.day_name }}</option>
      </select>

      <label class="block text-sm">Преподаватель</label>
      <select v-model="lessonToEdit.teacher.id" class="w-full border p-2 rounded">
        <option v-for="teacher in teachers" :key="teacher.id" :value="teacher.id">{{ teacher.name }}</option>
      </select>

      <label class="block text-sm">Время начала</label>
      <select v-model="lessonToEdit.lesson_starts_time" class="w-full border p-2 rounded">
        <option v-for="time in startTimes" :key="time" :value="time">{{ time }}</option>
      </select>

      <label class="block text-sm">Кабинет</label>
      <input v-model="lessonToEdit.classroom" class="w-full border p-2 rounded" />

      <div class="flex justify-end gap-2 mt-4">
        <button @click="submitLessonUpdate" class="bg-green-500 text-white px-4 py-2 rounded">Сохранить</button>
        <button @click="closeEditModal" class="bg-gray-500 text-white px-4 py-2 rounded">Отмена</button>
      </div>
    </div>
  </div>
</template>
