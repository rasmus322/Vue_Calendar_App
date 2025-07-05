<script setup lang="ts">
import { Task, TaskCategory } from '@/stores/tasks';
import { computed, defineProps } from 'vue';
import SideBarTasksBlock from './SideBarTasksBlock.vue'

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

const hasTasksToday = computed(() => {
    return props.tasks.some(task => 
        new Date(task.date).toDateString() === today.toDateString()
    )
})
const hasTasksTomorrow = computed(() => {
    return props.tasks.some(task => 
        new Date(task.date).toDateString() === tomorrow.toDateString()
    ) 
}) 
</script>

<template>
    <div class="tasks-container">
        <SideBarTasksBlock :day="'today'" :tasks="props.tasks" :category-colors="props.categoryColors"/>
        <SideBarTasksBlock :day="'tomorrow'" :tasks="props.tasks" :category-colors="props.categoryColors"/>
        <div v-if="!hasTasksToday && !hasTasksTomorrow" class="tasks-section tasks-none">
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
</style>