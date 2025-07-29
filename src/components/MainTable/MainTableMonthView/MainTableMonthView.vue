<script setup lang="ts">
import { Event } from '@/stores/events';
import { EventCategory } from '@/types';
import { defineProps, computed } from 'vue';

interface Props {
    /// Array of events
    events: Event[];
    /// List of category names and its color
    categoryColors: Record<EventCategory, string>;
    /// Array that tells if the day is today
    isToday: boolean[];
    /// Array with number of days in a month
    daysNumbers: { day: number, isCurrentMonth: boolean }[]
}

const props = defineProps<Props>()

const getEventsForDay = (dayIndex: number) => {
    const day = props.daysNumbers[dayIndex]
    
    if (!day.isCurrentMonth) {
        return { events: [], hasMore: false, moreCount: 0 }
    }
    
    const dayEvents = props.events.filter(event => {
        const eventDate = new Date(event.date)
        return eventDate.getDate() === day.day;
    })
    
    if (dayEvents.length <= 2) {
        return { events: dayEvents, hasMore: false, moreCount: 0 }
    }
    
    return {
        events: dayEvents.slice(0, 2),
        hasMore: true,
        moreCount: dayEvents.length - 2
    }
}

const transformDate = (dateString: string): string => {
    const date = new Date(dateString)
    return `${date.getHours() > 9 ? date.getHours() : '0' + date.getHours()}:${date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()}`
}
</script>

<template>
    <div class="month-wrapper">
        <div :class="'month-day-block' + (props.isToday[index] ? ' active' : '') + (!day.isCurrentMonth ? ' secondary' : '')" v-for="(day, index) in props.daysNumbers" :key="index">
            <span class="day-number"> {{ day.day }} </span>
            <ul class="day-events-list">
                <template v-for="event in getEventsForDay(index).events" :key="event.id">
                    <li class="day-event-item">
                        <span 
                            class="day-event-icon" 
                            :style="{ backgroundColor: props.categoryColors[event.category] }"
                        ></span>
                        <b 
                            class="day-event-name"
                            :style="{ color: props.categoryColors[event.category] }" 
                        >{{ event.name }}</b>
                        <p class="day-event-time">{{ transformDate(event.date) }}</p>
                    </li>
                </template>
                <li v-if="getEventsForDay(index).hasMore" class="day-event-add">
                    + {{ getEventsForDay(index).moreCount }} More
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .month-wrapper {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-template-rows: repeat(5, 1fr);
        height: 920px;
        max-height: 920px;
        padding-top: 25px;
    }
    .month-day-block {
        position: relative;
        max-height: 184px;

        height: 100%;
        display: flex;
        // flex-direction: column;
        align-items: flex-end;
        border-right: 1px solid var(--border-color-primary);
        border-bottom: 1px solid var(--border-color-primary);
        background-color: var(--bg-color-primary);
        padding: 3px 4px;
        &.active {
            background-color: #F5FAFF;
        }
        &.secondary {
            background-color: rgba(218, 220, 224, 0.6);
            .day-number {
                color: rgba(51, 51, 51, 0.5);
            }
        }
    }
    .day-number {
        position: absolute;
        top: 12px;
        left: 12px;
        font-weight: 500;
        font-size: 12px;
    }
    .day-events-list {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    .day-event-item {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .day-event-icon {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin-right: 2px;
    }
    .day-event-name {
        font-weight: 600;
        font-size: 10px;
        text-transform: capitalize;
        margin-right: auto;
    }
    .day-event-time {
        font-weight: 500;
        font-size: 10px;
    }
    .day-event-add {
        font-weight: 600;
        font-size: 10px;
        color: var(--bg-color-accent);
    }
</style>