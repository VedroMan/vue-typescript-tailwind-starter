import axios from 'axios';

const API_URL = "http://127.0.0.1:8000/api/"; // Базовый URL для API

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
        const response = await axios.get<Lesson[]>(`${API_URL}lessons/`);
        return response.data;
    } catch(error) {
        console.error("Ошибка загрузки уроков: ", error);
        return [];
    }
}

export async function getDays(): Promise<Day[]> {
    try {
        const response = await axios.get<Day[]>(`${API_URL}days/`);
        return response.data;
    } catch(error) {
        console.error("Ошибка загрузки дней: ", error)
        return [];
    }
}

export async function getTeachers(): Promise<Teacher[]> {
    try {
        const response = await axios.get<Teacher[]>(`${API_URL}teachers/`);
        return response.data;
    } catch(error) {
        console.error("Ошибка загрузки учителей: ", error);
        return [];
    }
}