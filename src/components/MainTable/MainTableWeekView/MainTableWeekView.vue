<script setup lang="ts">
import { defineProps } from 'vue';
import { Event } from '@/stores/events';
import { EventCategory } from '@/types';

interface Props {
    /// Array of events
    events: Event[];
    /// List of category names and its color
    categoryColors: Record<EventCategory, string>;
}

const props = defineProps<Props>()

const getEventsForHourAndDay = (hour: number, dayOffset: number) => {
    const today = new Date()
    const targetDate = new Date(today)
    targetDate.setDate(today.getDate() - today.getDay() + dayOffset)
    const targetDay = targetDate.toISOString().slice(0, 10)
    
    return props.events.filter(event => {
        const eventDate = new Date(event.date)
        const eventDay = eventDate.toISOString().slice(0, 10)
        const eventHour = eventDate.getHours()
        return eventDay === targetDay && eventHour === hour
    })
}
</script>

<template>
    <div class="week-wrapper">
        <div class="hour-row" v-for="hour in 24" :key="hour">
            <div class="hour-label">{{ String(hour - 1).padStart(2, '0') }}:00</div>
            <div class="hour-content">
                <div class="hour-day-block" v-for="day in 7" :key="day">
                    <div 
                        v-for="event in getEventsForHourAndDay(hour - 1, day)"
                        :key="event.id"
                        class="hour-day-event"
                        :style="{ backgroundColor: props.categoryColors[event.category] }"
                    >
                        {{ 
                            event.name.length > 15 ? 
                            event.name.substring(0, 15) + '...' : 
                            event.name 
                        }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .week-wrapper {
        display: flex;
        flex-direction: column;
        padding-top: 25px;
    }
    .hour-row {
        min-height: 80px;
        height: auto;
        display: flex;
        align-items: stretch;
    }
    .hour-label {
        width: 55px;
        display: flex;
        align-items: center;
    }
    .hour-content {
        flex: 1;
        display: grid;
        grid-template-columns: repeat(7, 1fr);
    }
    .hour-day-block {
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 0;
        &:not(:last-child) {
            border-right: 1px solid var(--border-color-primary);
        }
        padding: 4px;
    }
    .hour-day-event {
        flex: 1;
        width: 100%;
        max-width: 100%;
        min-height: 28px;
        height: auto;
        border-radius: 4px;
        color: var(--text-color-accent);
        font-size: 12px;
        display: flex;
        align-items: center;
        overflow: hidden;
        padding: 4px;
    }
</style>