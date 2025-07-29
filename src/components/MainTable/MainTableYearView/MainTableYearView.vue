<script setup lang="ts">
import { defineProps, computed } from 'vue';
import SideBarCalendar from '@/components/SideBar/SideBarCalendar/SideBarCalendar.vue';
import { useCalendarStore } from '@/stores/calendar';

interface Props {
    /// Flag that tells if the day is today
    isToday: boolean[];
    /// Array with number of days in a month
    daysNumbers: { day: number, isCurrentMonth: boolean }[];
    /// Array with names of days
    daysNames: string[];
}

const props = defineProps<Props>()
const { currentYear } = useCalendarStore()

const generateMonthData = (monthIndex: number) => {
    const firstDay = new Date(currentYear, monthIndex, 1)
    const lastDay = new Date(currentYear, monthIndex + 1, 0)
    const daysCount = lastDay.getDate()
    
    const firstDayOfWeek = (firstDay.getDay() + 6) % 7
    const lastDayOfWeek = (lastDay.getDay() + 6) % 7
    
    const days: { day: number, isCurrentMonth: boolean }[] = []
  
    if (firstDayOfWeek > 0) {
        const prevMonthDays = new Date(currentYear, monthIndex, 0).getDate()
        for (let i = firstDayOfWeek - 1; i >= 0; i--) {
            days.push({ day: prevMonthDays - i, isCurrentMonth: false })
        }
    }
    
    for (let i = 1; i <= daysCount; i++) {
        days.push({ day: i, isCurrentMonth: true })
    }
    
    if (lastDayOfWeek < 6) {
        for (let i = 1; i <= 6 - lastDayOfWeek; i++) {
            days.push({ day: i, isCurrentMonth: false })
        }
    }
    
    return days
}

const generateTodayFlags = (monthIndex: number, monthDays: { day: number, isCurrentMonth: boolean }[]) => {
    const today = new Date().getDate()
    const todayMonth = new Date().getMonth()
    const todayYear = new Date().getFullYear()
    
    return monthDays.map((dayObj) => 
        dayObj.day === today && 
        dayObj.isCurrentMonth && 
        monthIndex === todayMonth && 
        currentYear === todayYear
    )
}
</script>

<template>
    <div class="year-wrapper">
        <div v-for="month in 12" :key="month" class="year-month">
            <h3 class="year-month-number">
                {{
                    month < 10 ?
                    `0${month}` :
                    month
                }}
            </h3>

            <SideBarCalendar
                :is-today="generateTodayFlags(month - 1, generateMonthData(month - 1))"
                :days-numbers="generateMonthData(month - 1)"
                :days-names="props.daysNames"
            />
        </div>
    </div>
</template>

<style scoped lang="scss">
    .year-wrapper {
        // display: grid;
        // grid-template-columns: repeat(4, 1fr);
        // grid-template-rows: repeat(3, 1fr);
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 5px;
        padding: 24px;
    }
    .year-month {
        border: 1px solid transparent;
        transition: 0.3s;
        &:hover,
        &:focus-visible {
            border-color: var(--border-color-primary);
        }
    }
    .year-month-number {
        font-weight: 500;
        font-size: 12px;
        text-align: center;
        margin-bottom: 10px;
    }
</style>