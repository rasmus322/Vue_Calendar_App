<script setup lang="ts">
import { Task, TaskCategory } from '@/stores/tasks';
import { defineProps } from 'vue';

interface Props {
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
    <div class="tasks-container">
        <div v-if="props.tasks.find((task) => isSameDay(task.date, today))" class="tasks-section tasks-today">
            <h3 class="tasks-title title-today">
                <img src="@/assets/calendar.svg" alt="">
                Today 
            </h3>
            <ul class="tasks-list">
                <li class="tasks-item" v-for="task in props.tasks.filter(task => isSameDay(task.date, today))" :key="task.id">
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
        <div v-if="props.tasks.find((task) => isSameDay(task.date, tomorrow))" class="tasks-section tasks-tomorrow">
            <h3 class="tasks-title title-tomorrow">
                <img src="@/assets/calendar.svg" alt="">
                Tomorrow 
            </h3>
            <ul class="tasks-list">
                <li class="tasks-item" v-for="task in props.tasks.filter(task => isSameDay(task.date, tomorrow))" :key="task.id">
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
        <div v-if="!tasks.find((task) => isSameDay(task.date, today)) && !tasks.find((task) => isSameDay(task.date, tomorrow))" class="tasks-section tasks-none">
            <h3 class="tasks-title"> You don't have any tasks for the nearest days </h3>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .tasks-container {
        width: 100%;
        padding: 10px 16px;
    }
    .tasks-section {
        width: 100%;
        &.tasks-today {
            margin-bottom: 30px;
        }
    }
    .tasks-title {
        font-weight: 500;
        font-size: 16px;
        color: #333;
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
        color: #333;
    }
</style>