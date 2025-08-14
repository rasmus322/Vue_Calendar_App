<script setup lang="ts">
import { Event } from '@/stores/events';
import { EventCategory } from '@/types';
import { computed, defineProps } from 'vue';
import SideBarEventsBlock from './SideBarEventsBlock.vue'

interface Props {
    /// Object with hex codes of color of categories
    categoryColors: Record<EventCategory, string>;
    /// array of events
    events: Event[]
}

const props = defineProps<Props>()

const today = new Date()
const tomorrow = new Date(today)
tomorrow.setDate(today.getDate() + 1)

const hasEventsToday = computed(() => {
    return props.events.some(event => 
        new Date(event.date).toDateString() === today.toDateString()
    )
})
const hasEventsTomorrow = computed(() => {
    return props.events.some(event => 
        new Date(event.date).toDateString() === tomorrow.toDateString()
    ) 
}) 
</script>

<template>
    <div class="events-container">
        <SideBarEventsBlock :day="'today'" :events="props.events" :category-colors="props.categoryColors"/>
        <SideBarEventsBlock :day="'tomorrow'" :events="props.events" :category-colors="props.categoryColors"/>
        <div v-if="!hasEventsToday && !hasEventsTomorrow" class="events-section events-none">
            <h3 class="events-title"> You don't have any events for the nearest days </h3>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .events-container {
        width: 100%;
        padding: 10px 16px;
    }
    .events-section {
        width: 100%;
        &.events-today {
            margin-bottom: 30px;
        }
    }
</style>