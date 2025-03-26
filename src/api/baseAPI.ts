/* CRUD операции с API */

import axios from 'axios';
import type { Day, Lesson, Teacher, Group } from './schemas';

export const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5005";

/* Группы */

export async function getGroups(): Promise<Group[]> {
    try {
        const response = await axios.get<Group[]>(`${API_URL}/api/groups`);
        return response.data;
    } catch (error) {
        console.error("Ошибка загрузки групп:", error);
        return [];
    }
}

export async function createGroup(group: string) {
    try {
        await axios.post(`${API_URL}/api/groups`, { group_name: group });
    } catch (error) {
        console.error("Ошибка создания группы:", error);
    }
}

export async function updateGroup(id: number, group: string) {
    try {
        await axios.put(`${API_URL}/api/groups/${id}`, { group_name: group });
    } catch (error) {
        console.error("Ошибка изменения группы:", error);
    }
}

export async function deleteGroup(id: number) {
    try {
        await axios.delete(`${API_URL}/api/groups/${id}`);
    } catch (error) {
        console.error("Ошибка удаления группы:", error); 
    }
}

/* Дни */

export async function getDays(): Promise<Day[]> {
    try {
        const response = await axios.get<Day[]>(`${API_URL}/api/days`);
        return response.data;
    } catch(error) {
        console.error("Ошибка загрузки дней: ", error);
        return [];
    }
}

export async function createDay(day: string) {
    try {
        await axios.post(`${API_URL}/api/days`, { day_name: day });
    } catch (error) {
        console.error("Ошибка создания дня:", error);
    }
}

export async function updateDay(id: number, day: string) {
    try {
        await axios.put(`${API_URL}/api/days/${id}`, { day_name: day });
    } catch (error) {
        console.error("Ошибка изменения дня:", error);
    }
}

export async function deleteDay(id: number) {
    try {
        await axios.delete(`${API_URL}/api/days/${id}`);
    } catch (error) {
        console.error("Ошибка удаления дня:", error);
    }
}

/* Учителя */

export async function getTeachers(): Promise<Teacher[]> {
    try {
        const response = await axios.get<Teacher[]>(`${API_URL}/api/teachers`);
        return response.data;
    } catch(error) {
        console.error("Ошибка загрузки учителей: ", error);
        return [];
    }
}

export async function createTeacher(name: string) {
    try {
        await axios.post(`${API_URL}/api/teachers`, { name: name });
    } catch (error) {
        console.error("Ошибка создания учителя: ", error);
    }
}

export async function updateTeacher(id: number, name: string) {
    try {
        await axios.put(`${API_URL}/api/teachers/${id}`, { name: name });
    } catch (error) {
        console.error("Ошибка изменения учителя: ", error);
    }
}

export async function deleteTeacher(id: number) {
    try {
        await axios.delete(`${API_URL}/api/teachers/${id}`);
    } catch (error) {
        console.error("Ошибка удаления учителя:", error);
    }
}

/* Уроки */

export async function getLessons(): Promise<Lesson[]> {
    try {
        const response = await axios.get<Lesson[]>(`${API_URL}/api/lessons`);
        return response.data;
    } catch (error) {
        console.error("Ошибка загрузки уроков:", error);
        return [];
    }
}

export async function createLesson(lesson: Lesson) {
    try {
        await axios.post(`${API_URL}/api/lessons`, lesson);
    } catch (error) {
        console.error("Ошибка создания урока:", error);
    }
}

export async function updateLesson(id: number, lesson: Lesson) {
    try {
        await axios.put(`${API_URL}/api/lessons/${id}`, lesson);   
    } catch (error) {
        console.error("Ошибка изменения урока:", error);
    }
}

export async function deleteLesson(id: number) {
    try {
        await axios.delete(`${API_URL}/api/lessons/${id}`);
    } catch (error) {
        console.error("Ошибка удаления урока", error);
    }
}


export function groupLessonsByDay(lessons: Lesson[]): Record<string, Lesson[]> {
    const grouped: Record<string, Lesson[]> = {};

    lessons.forEach(lesson => {
        const dayName = lesson.day.day_name;

        if (!grouped[dayName]) {
            grouped[dayName] = [];
        }
        grouped[dayName].push(lesson);
    });

    return grouped;
}
