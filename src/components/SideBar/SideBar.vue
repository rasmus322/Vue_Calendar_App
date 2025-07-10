<script setup lang="ts">
import { useEventsStore } from '@/stores/events';
import SideBarCalendar from './SideBarCalendar/SideBarCalendar.vue';
import SideBarTasks from './SideBarTasks/SideBarTasks.vue';
import { useCalendarStore } from '@/stores/calendar';

const calendarStore = useCalendarStore();
const eventsStore = useEventsStore()
</script>

<template>
    <div class="sidebar-container">
        <div class="sidebar-title-container">
            <h2 class="sidebar-title"> {{ calendarStore.currentMonthName }} </h2>
        </div>
        <SideBarCalendar 
            :days-names="calendarStore.daysNames" 
            :is-today="calendarStore.isToday" 
            :days-numbers="calendarStore.daysNumbers"
        />
        <SideBarTasks
            :category-colors="eventsStore.categoryColors"
            :events="eventsStore.events"
        />
    </div>
</template>

<style scoped lang="scss">
    .sidebar-container {
        max-width: 250px;
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        border-right: 1px solid var(--border-color-primary);
    }
    .sidebar-title-container {
        padding: 10px 16px;
    }
    .sidebar-title {
        font-weight: 500;
        font-size: 18px;
    }
</style>