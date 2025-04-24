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
  <div class="max-w-5xl mx-auto px-4 py-10">
    <h2 class="text-3xl font-bold text-center text-gray-900 mb-4">📚 Управление занятиями</h2>

    <div v-if="loading" class="text-center text-blue-500 text-lg animate-pulse mb-4">Загрузка данных...</div>
    <p v-if="errorMessage" class="text-center text-red-600 text-lg mb-4">{{ errorMessage }}</p>
    <p v-if="message" class="text-center text-green-600 text-lg mb-4">{{ message }}</p>

    <!-- Блок добавления урока -->
    <div class="bg-white border rounded-lg shadow p-6 mb-10 space-y-4">
      <h3 class="text-xl font-semibold text-gray-800">Форма для заполнения</h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="text-sm text-gray-600">Предмет</label>
          <select v-model="selectedSubject" class="w-full border rounded p-2">
            <option disabled value="">Выберите предмет</option>
            <option v-for="subject in subjects" :key="subject" :value="subject">{{ subject }}</option>
          </select>
        </div>

        <div>
          <label class="text-sm text-gray-600">День</label>
          <select v-model="selectedDay" class="w-full border rounded p-2">
            <option disabled value="">Выберите день</option>
            <option v-for="day in days" :key="day.id" :value="day.id">{{ day.day_name }}</option>
          </select>
        </div>

        <div>
          <label class="text-sm text-gray-600">Преподаватель</label>
          <select v-model="selectedTeacher" class="w-full border rounded p-2">
            <option disabled value="">Выберите преподавателя</option>
            <option v-for="teacher in teachers" :key="teacher.id" :value="teacher.id">{{ teacher.name }}</option>
          </select>
        </div>

        <div>
          <label class="text-sm text-gray-600">Время начала</label>
          <select v-model="selectedStartTime" class="w-full border rounded p-2">
            <option disabled value="">Выберите время</option>
            <option v-for="time in startTimes" :key="time" :value="time">{{ time }}</option>
          </select>
          <p class="text-sm text-gray-500 mt-1">Время окончания: <strong>{{ calculateEndTime }}</strong></p>
        </div>

        <div class="col-span-2">
          <label class="text-sm text-gray-600">Кабинет</label>
          <input v-model="classroom" class="w-full border p-2 rounded" placeholder="Введите кабинет" />
        </div>
      </div>

      <div class="text-center mt-4">
        <button @click="addLesson" :disabled="loading" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 hover:scale-105 transition">
          Добавить занятие
        </button>
      </div>
    </div>

    <div class="text-center text-gray-500 mb-6">
      Всего занятий: <strong>{{ lessons.length }}</strong>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div
        v-for="lesson in lessons"
        :key="lesson.id"
        class="bg-white border rounded-lg shadow p-4 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
      >
        <div class="text-gray-800 font-semibold text-lg">
          {{ lesson.subject }}
        </div>

        <div class="text-sm text-gray-600 mt-1">
          🗓️ {{ days.find(d => d.id === lesson.day.id)?.day_name || "Отсутствует" }}
        </div>
        <div class="text-sm text-gray-600">
          👩‍🏫 {{ teachers.find(t => t.id === lesson.teacher.id)?.name || "Отсутствует" }}
        </div>
        <div class="text-sm text-gray-600">
          ⏰ {{ lesson.lesson_starts_time.slice(0, 5) }} - {{ lesson.lesson_ends_time.slice(0, 5) }}
        </div>
        <div class="text-sm text-gray-600 mb-3">
          🚪 {{ lesson.classroom }}
        </div>

        <div class="flex justify-end gap-2">
          <button @click="openEditModal(lesson)" :disabled="loading" class="bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600">
            <font-awesome-icon :icon="faPen" />
          </button>
          <button @click="removeLesson(lesson.id)" :disabled="loading" class="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600">
            <font-awesome-icon :icon="faTrash" />
          </button>
        </div>
      </div>
    </div>

    <!-- Редактирование урока -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div class="bg-white w-full max-w-md p-6 rounded-lg shadow-lg space-y-4 relative" v-if="lessonToEdit">
        <h3 class="text-xl font-bold text-gray-800">✏️ Редактировать занятие</h3>

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
        <input v-model="lessonToEdit.classroom" class="w-full border p-2 rounded" placeholder="Кабинет" />

        <div class="flex justify-end gap-2 mt-2">
          <button @click="submitLessonUpdate" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Сохранить
          </button>
          <button @click="closeEditModal" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
            Отмена
          </button>
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
