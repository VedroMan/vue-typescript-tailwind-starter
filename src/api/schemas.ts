/* Валидация данных */
/* schemas.ts */

export interface Group {
    id: number;
    group_name: string;
    days: string;

    editing: boolean;
}

export interface Lesson {
    id: number;
    day: Day;
    lesson_starts_time: string;
    lesson_ends_time: string;
    classroom: string;
    subject: string;
    teacher: Teacher;

    editing: boolean
}
  
export interface Day {
    id: number;
    day_name: string;
    group_id: number;
    lessons: string;

    editing: boolean;
}
  
export interface Teacher {
    id: number;
    name: string;

    editing: boolean;
}

export interface User {
    id: number;
    telegram_id: number;
    username: string | null;
    first_name: string | null;
    last_name: string | null;
}