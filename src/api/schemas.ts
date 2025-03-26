/* Валидация данных */

export interface Group {
    id: number;
    group_name: string;
    days: string;
}

export interface Lesson {
    id: number;
    day: Day;
    lesson_starts_time: string;
    lesson_ends_time: string;
    classroom: string;
    subject: string;
    teacher: Teacher;
}
  
export interface Day {
    id: number;
    day_name: string;
}
  
export interface Teacher {
    id: number;
    name: string;
}