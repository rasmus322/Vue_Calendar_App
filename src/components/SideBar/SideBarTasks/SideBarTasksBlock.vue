<script setup lang="ts">
import { defineProps } from 'vue';
import { Task, TaskCategory } from '@/stores/tasks';

interface Props {
    /// Parametr that tells for what day is this block of tasks
    day: string;
    /// Object with hex codes of color of categories
    categoryColors: Record<TaskCategory, string>;
    /// array of tasks
    tasks: Task[]
}

const props = defineProps<Props>()

const today = new Date()
const tomorrow = new Date(today)
tomorrow.setDate(today.getDate() + 1)

const isSameDay = (date1: Date, date2: Date) => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear()
}

const transformDate = (date: Date): string => {
    return `${date.getHours() > 10 ? date.getHours() : '0' + date.getHours()}
            : ${date.getMinutes()}`
}
</script>

<template>
    <div 
        v-if="props.tasks.find(task => isSameDay(task.date, today)) || 
        props.tasks.find(task => isSameDay(task.date, tomorrow))" 
        :class="`tasks-section ${day === 'today' ? 'tasks-today' : 'tasks-tomorrow'}`"
    >
        <h3 class="tasks-title">
            <img src="@/assets/calendar.svg" alt="">
            {{ props.day }}
        </h3>
        <ul class="tasks-list">
            <li 
                class="tasks-item" 
                v-for="task in props.tasks.filter(task => props.day === 'today' ? isSameDay(task.date, today) : isSameDay(task.date, tomorrow))" 
                :key="task.id"
            >
                <span 
                    class="tasks-item-icon" 
                    :style="{ backgroundColor: props.categoryColors[task.category] }"
                ></span>
                <b 
                    class="tasks-item-name"
                    :style="{ color: props.categoryColors[task.category] }" 
                >{{ task.name }}</b>
                <p class="tasks-item-time">{{ transformDate(task.date) }}</p>
            </li>
        </ul>
    </div>
</template>

<style scoped lang="scss">
    .tasks-title {
        font-weight: 500;
        font-size: 16px;
        color: var(--text-color-primary);
        margin-bottom: 10px;
        img {
            width: 20px;
            height: 20px;
        }
    }
    .tasks-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .tasks-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .tasks-item-icon {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin-right: 2px;
    }
    .tasks-item-name {
        font-weight: 600;
        font-size: 10px;
        text-transform: capitalize;
        margin-right: auto;
    }
    .tasks-item-time {
        font-weight: 500;
        font-size: 10px;
        color: var(--text-color-primary);
    }
</style>