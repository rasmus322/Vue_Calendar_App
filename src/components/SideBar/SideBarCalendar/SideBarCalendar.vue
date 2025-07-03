<script setup lang="ts">
import { defineProps } from 'vue';

interface Props {
    /// Array of names of days
    daysNames: string[];
    /// Boolean array that tells if date is today
    isToday: boolean[];
    /// Array of number of days
    daysNumbers: { day: number, isCurrentMonth: boolean }[];
}

const props = defineProps<Props>()
</script>

<template>
    <div class="calendar-container">
        <h6 class="calendar-daysName" v-for="dayName in props.daysNames" :key="dayName"> {{ dayName.slice(0, 1) }} </h6>
        <p :class="'calendar-daysNumber' + (props.isToday[index] ? ' active' : '') + (!dayNumber.isCurrentMonth ? ' secondary' : '')" v-for="(dayNumber, index) in props.daysNumbers" :key="index"> {{ dayNumber.day }} </p>
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
            color: rgba(51, 51, 51, 0.6);
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
        
            &.active {
                background-color: var(--accent-bg-color);
                color: var(--accent-text-color);
                border-radius: 50%;
            }
            &.secondary {
                opacity: 0.3;
            }
        }
    }
</style>