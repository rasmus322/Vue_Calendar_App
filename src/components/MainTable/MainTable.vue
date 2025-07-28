 <script setup lang="ts">
import { defineProps } from 'vue';
import { useCalendarStore } from '@/stores/calendar';
import { SelectOptionType } from '@/types';
import { useEventsStore } from '@/stores/events';
import MainTableDayView from './MainTableDayView/MainTableDayView.vue';
import MainTableWeekView from './MainTableWeekView/MainTableWeekView.vue';
import MainTableMonthView from './MainTableMonthView/MainTableMonthView.vue';
import './style.scss'

interface Props {
    /// Additional class that tells if SideBar is closed
    addClass: string;
    /// Shows what type of calendar to use
    selectOption: SelectOptionType;
    /// Array that tells if the day is today
    isToday: boolean[];
    /// Array with number of days in a month
    daysNumbers: { day: number, isCurrentMonth: boolean }[]
}

const props = defineProps<Props>()
const { daysNames } = useCalendarStore()
const { events, categoryColors } = useEventsStore()

const days = ['', ...daysNames]

const changeComponent = () => {
    switch(props.selectOption) {
        case 'day':
            return MainTableDayView
        case 'week':
            return MainTableWeekView
        case 'month':
            return MainTableMonthView
    }
}
</script>

<template>
    <div :class="'table-container' + props.addClass">
        <div v-if="selectOption === 'week' || selectOption === 'month'" class="dayNames-container">
            <p v-for="day in days" :key="day" class="days-name">{{ day.substring(0, 3) }}</p>
        </div>
        <component 
            :is="changeComponent()" 
            :events="events" 
            :category-colors="categoryColors"
            :is-today="isToday"
            :days-numbers="daysNumbers"
        />
    </div>
</template>

<style scoped lang="scss">
    .table-container {
        position: relative;
        transition: 0.3s;
        margin-left: 250px;
        margin-top: 78px;
        &.full {
            margin-left: 0;
        }
    }
    .dayNames-container {
        width: calc(100% - 250px);
        position: fixed;
        display: grid;
        grid-template-columns: 55px repeat(7, 1fr);
        border-bottom: 1px solid var(--border-color-primary);
        background-color: var(--bg-color-primary);
        z-index: 10;
    }
    .days-name {
        font-weight: 500;
        font-size: 12px;
        text-align: center;
        background-color: var(--bg-color-primary);
        padding: 3px;
    }
</style>