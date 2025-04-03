/* CRUD операции с API */
/* api.ts */

import type { Day, Lesson, Teacher, Group } from './schemas';
import { API_URL, contentType } from '../config';

/* MARK: Группы */

export const getGroups = async (
  groups: { value: Group[] }
) => {
    const response = await fetch(`${API_URL}/api/groups/`);
    if (response.ok) {
        groups.value = await response.json();
    } else {
        throw new Error("Ошибка загрузки групп");
    }
};
  
export const createGroup = async (
  groupName: { value: string },
  message: { value: string },
  getGroups: () => Promise<void>
) => {
  const response = await fetch(`${API_URL}/api/groups/`, {
    method: "POST",
    headers: contentType,
    body: JSON.stringify({ group_name: groupName.value }),
  });

  if (response.ok) {
    message.value = "Группа успешно добавлена!";
    setTimeout(() => (message.value = ""), 3000);
    groupName.value = "";
    await getGroups();
  } else {
    throw new Error("Ошибка при добавлении");
  }
};
  
export const deleteGroup = async (
  id: number,
  getGroups: () => Promise<void>
) => {
  const response = await fetch(`${API_URL}/api/groups/${id}`, { method: "DELETE" });
  if (response.ok) {
    await getGroups();
  } else {
    throw new Error("Ошибка удаления группы");
  }
};
  
export const updateGroup = async (
  group: Group,
  getGroups: () => Promise<void>
) => {
  const response = await fetch(`${API_URL}/api/groups/${group.id}`, {
    method: "PUT",
    headers: contentType,
    body: JSON.stringify({ id: group.id, group_name: group.group_name }),
  });
  if (response.ok) {
    group.editing = false;
    await getGroups();
  } else {
    throw new Error("Ошибка обновления группы");
  }
};

/* MARK: Дни */

export const getDays = async (
  days: { value: Day[] }
) => {
  const response = await fetch(`${API_URL}/api/days/`);
  if (response.ok) { 
    days.value = await response.json();
  } else {
    throw new Error("Ошибка загрузки дней");
  }
};
  
export const createDay = async (
  dayName: { value: string },
  group: { value: string },
  message: { value: string },
  getDays: () => Promise<void>
) => {
  const response = await fetch(`${API_URL}/api/days/`, {
    method: "POST",
    headers: contentType,
    body: JSON.stringify({ day_name: dayName.value, group_id: group.value }),
  });

  if (response.ok) {
    message.value = "День успешно добавлен!";
    setTimeout(() => (message.value = ""), 3000);
    dayName.value = "";
    group.value = "";
    await getDays();
  } else {
    throw new Error("Ошибка при добавлении");
  }
};
  
export const deleteDay = async (
  id: number,
  getDays: () => Promise<void>
) => {
  const response = await fetch(`${API_URL}/api/days/${id}`, { method: "DELETE" });
  if (response.ok) {
    await getDays();
  } else {
    throw new Error("Ошибка удаления дня");
  }
};
  
export const updateDay = async (
  day: Day,
  getDays: () => Promise<void>
) => {
  const response = await fetch(`${API_URL}/api/days/${day.id}`, {
    method: "PUT",
    headers: contentType,
    body: JSON.stringify({ id: day.id, day_name: day.day_name, group_id: day.group_id }),
  });

  if (response.ok) {
    day.editing = false;
    await getDays();
  } else {
    throw new Error("Ошибка обновления дня");
  }
};

// Фильтрация дней по группе


/* MARK: Педагоги */

export const getTeachers = async (
  teachers: { value: Teacher[] }
) => {
  const response = await fetch(`${API_URL}/api/teachers/`);
  if (response.ok) {
    teachers.value = await response.json();
  } else {
    throw new Error("Ошибка загрузки учителей");
  }
};
  
export const createTeacher = async (
  teacherName: { value: string },
  message: { value: string },
  getTeachers: () => Promise<void>
) => {
  const response = await fetch(`${API_URL}/api/teachers/`, {
    method: "POST",
    headers: contentType,
    body: JSON.stringify({ name: teacherName.value }),
  });
  if (response.ok) {
    message.value = "Учитель успешно добавлен!";
    setTimeout(() => (message.value = ""), 3000);
    teacherName.value = "";
    await getTeachers();
  } else {
    throw new Error("Ошибка при добавлении");
  }
};
  
export const deleteTeacher = async (
  id: number,
  getTeachers: () => Promise<void>
) => {
  const response = await fetch(`${API_URL}/api/teachers/${id}`, { method: "DELETE" });
  if (response.ok) {
    await getTeachers();
  } else {
    throw new Error("Ошибка удаления учителя");
  }
};
  
export const updateTeacher = async (
  teacher: Teacher,
  getTeachers: () => Promise<void>
) => {
  const response = await fetch(`${API_URL}/api/teachers/${teacher.id}`, {
    method: "PUT",
    headers: contentType,
    body: JSON.stringify({ id: teacher.id, name: teacher.name }),
  });

  if (response.ok) {
    teacher.editing = false;
    await getTeachers();
  } else {
    throw new Error("Ошибка обновления учителя");
  }
};

/* MARK: Уроки */

export const getLessons = async (
  lessons: { value: Lesson[] }
) => {
  const response = await fetch(`${API_URL}/api/lessons/`);
  if (response.ok) {
    lessons.value = await response.json();
  } else {
    throw new Error("Ошибка получения уроков")
  }
};

// уроки по дню

export const getLessonsByDay = async (
  id: number
) => {
  const response = await fetch(`${API_URL}/api/lessons/day/${id}`);
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Ошибка получения уроков по дню");
  }
};

// уроки по преподу

export const getLessonsByTeacher = async (
  id: number
) => {
  const response = await fetch(`${API_URL}/api/lessons/teacher/${id}`);
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Ошибка получения уроков по преподавателю");
  }
};

export const createLesson = async (
  subject: { value: string },
  classroom: { value: string },
  lessonStartsTime: { value: string },
  lessonEndsTime: { value: string },
  day: { value: string },
  teacher: { value: string },
  message: { value: string },

  getLessons: () => Promise<void>
) => {
  const response = await fetch(`${API_URL}/api/lessons/`, {
    method: "POST",
    headers: contentType,
    body: JSON.stringify(
      { day_id: day.value,
        subject: subject.value, 
        lesson_starts_time: lessonStartsTime.value,
        lesson_ends_time: lessonEndsTime.value,
        classroom: classroom.value,
        teacher_id: teacher.value
      })
  });

  if (response.ok) {
    message.value = "Урок успешно добавлен!";
    setTimeout(() => (message.value = ""), 3000);
    subject.value = "";
    day.value = "";
    classroom.value = "";
    lessonStartsTime.value = "";
    lessonEndsTime.value = "";
    day.value = "";
    teacher.value = "";
    await getLessons();
  } else {
    throw new Error("Ошибка при добавлении");
  }
};

export const deleteLesson = async (
  id: number,
  getLessons: () => Promise<void>
) => {
  const response = await fetch(`${API_URL}/api/lessons/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    await getLessons();
  } else {
    throw new Error("Ошибка удаления урока");
  }
};

export const updateLesson = async (
  lesson: Lesson,
  getLessons: () => Promise<void>
) => {
  const response = await fetch(`${API_URL}/api/lessons/${lesson.id}`, {
    method: "PUT",
    headers: contentType,
    body: JSON.stringify(
      {
        day_id: lesson.day.id,
        subject: lesson.subject, 
        lesson_starts_time: lesson.lesson_starts_time,
        lesson_ends_time: lesson.lesson_ends_time,
        classroom: lesson.classroom,
        teacher_id: lesson.teacher.id
    }),
  });

  if (response.ok) {
    lesson.editing = false;
    await getLessons();
  } else {
    throw new Error("Ошибка обновления урока");
  }
};

/* Группировка уроков по дням недели */
// в последующем комите буду фильтровать уже на беке(временный костыль):)

export const getLessonsForDayFilter = async (): Promise<Lesson[]> => {
  const response = await fetch(`${API_URL}/api/lessons/`);
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Ошибка загрузки уроков");
  }
};

/* фильтр для группировки */

export const filterLessonsByDay = (lessons: Lesson[]): Record<string, Lesson[]> => {
  const filteredLessons: Record<string, Lesson[]> = {};

  lessons.forEach((lesson) => {
    const dayName = lesson.day.day_name;
    if (!filteredLessons[dayName]) {
        filteredLessons[dayName] = [];
    }
    filteredLessons[dayName].push(lesson);
  });

  return filteredLessons;
};
