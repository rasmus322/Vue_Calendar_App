<script setup lang="ts">
import { Event } from '@/stores/events';
import { EventCategory } from '@/types';
import { computed, defineProps } from 'vue';
import SideBarTasksBlock from './SideBarTasksBlock.vue'

interface Props {
    /// Object with hex codes of color of categories
    categoryColors: Record<EventCategory, string>;
    /// array of tasks
    events: Event[]
}

const props = defineProps<Props>()

const today = new Date()
const tomorrow = new Date(today)
tomorrow.setDate(today.getDate() + 1)

const hasTasksToday = computed(() => {
    return props.events.some(event => 
        new Date(event.date).toDateString() === today.toDateString()
    )
})
const hasTasksTomorrow = computed(() => {
    return props.events.some(event => 
        new Date(event.date).toDateString() === tomorrow.toDateString()
    ) 
}) 
</script>

<template>
    <div class="tasks-container">
        <SideBarTasksBlock :day="'today'" :events="props.events" :category-colors="props.categoryColors"/>
        <SideBarTasksBlock :day="'tomorrow'" :events="props.events" :category-colors="props.categoryColors"/>
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