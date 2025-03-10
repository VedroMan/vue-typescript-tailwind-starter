import axios from 'axios';

const API_URL = "https://4fd7n9-178-122-117-185.ru.tuna.am"; // Базовый URL для API
console.log(import.meta.env.VITE_API_URL);


// Валидация данных
export interface Lesson {
    id: number;
    day: string;
    lesson_starts_time: string;
    lesson_ends_time: string;
    classroom: string;
    subject: string;
    teacher: string;
}
  
export interface Day {
    id: number;
    day: string;
}
  
export interface Teacher {
    id: number;
    name: string;
}


export async function getLessons(): Promise<Lesson[]> {
    try {
        console.log("Запрос к API:", `${API_URL}/api/lessons/`);
        const response = await axios.get<Lesson[]>(`${API_URL}/api/lessons/`);
        console.log("Ответ API:", response.data);
        return response.data;
    } catch (error) {
        console.error("Ошибка загрузки уроков:", error);
        return [];
    }
}


export async function getDays(): Promise<Day[]> {
    try {
        const response = await axios.get<Day[]>(`${API_URL}/api/days/`);
        return response.data;
    } catch(error) {
        console.error("Ошибка загрузки дней: ", error)
        return [];
    }
}

export async function getTeachers(): Promise<Teacher[]> {
    try {
        const response = await axios.get<Teacher[]>(`${API_URL}/api/teachers/`);
        return response.data;
    } catch(error) {
        console.error("Ошибка загрузки учителей: ", error);
        return [];
    }
}

export function groupLessonsByDay(lessons: Lesson[]): Record<string, Lesson[]> {
    const grouped: Record<string, Lesson[]> = {};

    lessons.forEach(lesson => {
        if (!grouped[lesson.day]) {
            grouped[lesson.day] = [];
        }
        grouped[lesson.day].push(lesson);
    });

    return grouped;
}