<script setup lang="ts">
import { defineProps } from 'vue';
import { useCalendarStore } from '@/stores/calendar';
import { SelectOptionType } from '@/types';
import MainTableDayView from './MainTableDayView/MainTableDayView.vue';
import MainTableWeekView from './MainTableWeekView/MainTableWeekView.vue';

interface Props {
    /// Shows what type of calendar to use
    selectOption: SelectOptionType;
}

const props = defineProps<Props>()
const { daysNames } = useCalendarStore()

const days = ['', ...daysNames]

const changeComponent = () => {
    switch(props.selectOption) {
        case 'day':
            return MainTableDayView
        case 'week':
            return MainTableWeekView
    }
}
</script>

<template>
    <div class="table-container">
        <div v-if="selectOption === 'week' || selectOption === 'month'" class="dayNames-container">
            <p v-for="day in days" :key="day" class="days-name">{{ day.substring(0, 3) }}</p>
        </div>
        <component :is="changeComponent()" />
    </div>
</template>

<style scoped lang="scss">
    .table-container {
        position: relative;
        margin-left: 250px;
        margin-top: 78px;
    }
    .dayNames-container {
        width: calc(100% - 250px);
        position: fixed;
        display: grid;
        grid-template-columns: 55px repeat(7, 1fr);
        border-bottom: 1px solid var(--border-color-primary);
        background-color: var(--bg-color-primary);
    }
    .days-name {
        font-weight: 500;
        font-size: 12px;
        text-align: center;
        padding: 3px;
    }
</style>