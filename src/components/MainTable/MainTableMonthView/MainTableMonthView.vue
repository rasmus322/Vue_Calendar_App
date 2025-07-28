<script setup lang="ts">
import { Event } from '@/stores/events';
import { EventCategory } from '@/types';
import { defineProps } from 'vue';

interface Props {
    /// Array of events
    evnets: Event[];
    /// List of category names and its color
    categoryColors: Record<EventCategory, string>;
    /// Array that tells if the day is today
    isToday: boolean[];
    /// Array with number of days in a month
    daysNumbers: { day: number, isCurrentMonth: boolean }[]
}

const props = defineProps<Props>()
</script>

<template>
    <div class="month-wrapper">
        <div :class="'month-day-block' + (props.isToday[index] ? ' active' : '') + (!day.isCurrentMonth ? ' secondary' : '')" v-for="(day, index) in props.daysNumbers" :key="index">
            <span class="day-number"> {{ day.day }} </span>
            <ul class="day-events-list">
                <li class="day-event"></li>
            </ul>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .month-wrapper {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-template-rows: repeat(5, 1fr);
        height: 920px; /* 5 rows × 184px max-height */
        max-height: 920px;
        padding-top: 25px;
    }
    .month-day-block {
        position: relative;
        max-width: 173px;
        max-height: 184px;
        width: 100%;
        height: 100%;
        border-right: 1px solid var(--border-color-primary);
        border-bottom: 1px solid var(--border-color-primary);
        background-color: var(--bg-color-primary);
        padding: 3px 4px;
        &.active {
            background-color: #F5FAFF;
        }
        &.secondary {
            background-color: rgba(218, 220, 224, 0.6);
        }
    }
</style>