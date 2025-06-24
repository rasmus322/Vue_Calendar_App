<script setup lang="ts">
import { useCalendarStore } from '@/stores/calendar'

const calendarStore = useCalendarStore()
</script>

<template>
    <div class="calendar-container">
        <h6 class="calendar-daysName" v-for="day in calendarStore.daysNames" :key="day"> {{ day.slice(0, 1) }} </h6>
        <p :class="'calendar-daysNumber' + (calendarStore.isToday[day - 1] ? ' active' : '')" v-for="day in calendarStore.daysNumbers" :key="day"> {{ day }} </p>
    </div>
</template>

<style scoped lang="scss">
    .calendar-container {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-template-rows: repeat(5, 1fr);
        grid-column-gap: 0px;
        grid-row-gap: 0px;
        width: 100%;
        padding: 10px;
        .calendar-daysName {
            width: 34px;
            height: 34px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: 500;
            font-size: 10px;
            color: rgba(51, 51, 51, 0.5);
        }
        .calendar-daysNumber {
            width: 30px;
            height: 33px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: 500;
            font-size: 10px;
            color: var(--text-color-primary);
        }
        .calendar-daysNumber.active {
            background-color: var(--accent-bg-color);
            color: var(--accent-text-color);
            border-radius: 50%;
        }
    }
</style>