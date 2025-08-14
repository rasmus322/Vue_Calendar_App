<script setup lang="ts">
import { defineProps } from 'vue';
import { Event } from '@/stores/events';
import { EventCategory } from '@/types';

interface Props {
    /// Parametr that tells for what day is this block of events
    day: string;
    /// Object with hex codes of color of categories
    categoryColors: Record<EventCategory, string>;
    /// array of events
    events: Event[]
}

const props = defineProps<Props>()

const today = new Date()
const tomorrow = new Date(today)
tomorrow.setDate(today.getDate() + 1)

const isSameDay = (dateString: string, date2: Date) => {
    const date1 = new Date(dateString)
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear()
}

const transformDate = (dateString: string): string => {
    const date = new Date(dateString)
    return `${date.getHours() > 9 ? date.getHours() : '0' + date.getHours()}:${date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()}`
}
</script>

<template>
    <div 
        v-if="props.events.find(event => isSameDay(event.date, today)) || 
        props.events.find(event => isSameDay(event.date, tomorrow))" 
        :class="`events-section ${day === 'today' ? 'events-today' : 'events-tomorrow'}`"
    >
        <h3 class="events-title">
            <img src="@/assets/calendar.svg" alt="">
            {{ props.day }}
        </h3>
        <ul class="events-list">
            <li 
                class="events-item" 
                v-for="event in props.events.filter(event => props.day === 'today' ? isSameDay(event.date, today) : isSameDay(event.date, tomorrow))" 
                :key="event.id"
            >
                <span 
                    class="events-item-icon" 
                    :style="{ backgroundColor: props.categoryColors[event.category] }"
                ></span>
                <b 
                    class="events-item-name"
                    :style="{ color: props.categoryColors[event.category] }" 
                >
                    {{ 
                        event.name.length > 20 ?
                        event.name.substring(0, 20) + '...' :
                        event.name
                    }}
                </b>
                <p class="events-item-time">{{ transformDate(event.date) }}</p>
            </li>
        </ul>
    </div>
</template>

<style scoped lang="scss">
    .events-title {
        font-weight: 500;
        font-size: 16px;
        text-transform: capitalize;
        margin-bottom: 10px;
        img {
            width: 20px;
            height: 20px;
        }
    }
    .events-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .events-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .events-item-icon {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin-right: 2px;
    }
    .events-item-name {
        font-weight: 600;
        font-size: 10px;
        text-transform: capitalize;
        margin-right: auto;
    }
    .events-item-time {
        font-weight: 500;
        font-size: 10px;
    }
</style>