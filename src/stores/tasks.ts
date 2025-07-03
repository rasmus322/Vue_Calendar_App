import { defineStore } from "pinia";
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid"

export type TaskCategory = 'work' | 'entertainment' | 'sport' | 'health' | 'other'

export interface Task {
    /// Id of task
    id: string;
    /// Name of task
    name: string;
    /// Date and time by which the task must be completed
    date: Date;
    /// Category of task
    category: TaskCategory;
    /// Flag that tells if the task is completed
    completed: boolean;
}

export const useTasksStore = defineStore('tasksStore', () => {
    const categoryColors: Record<TaskCategory, string> = {
        work: '#BE1A1A',
        entertainment: '#E7C160',
        sport: '#2937B5',
        health: '#3BA86E',
        other: '#A384FF'
    }

    const tasks = ref<Task[]>([
        {
            id: uuidv4(),
            name: 'go ride a bike',
            date: new Date(),
            category: 'sport',
            completed: false
        },
        {
            id: uuidv4(),
            name: 'go to the gym',
            date: new Date(Date.now() + 24 * 60 * 60 * 1000),
            category: 'sport',
            completed: false
        },
        {
            id: uuidv4(),
            name: 'test task',
            date: new Date(),
            category: 'other',
            completed: true   
        }
    ])

    return { 
        categoryColors,
        tasks
    }
})