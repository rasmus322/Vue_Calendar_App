<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { useEventsStore } from '@/stores/events';
import SideBarCalendar from './SideBarCalendar/SideBarCalendar.vue';
import SideBarEvents from './SideBarEvents/SideBarEvents.vue';

interface Props {
    /// Array that tells if the day is today
    isToday: boolean[];
    /// Array with the names of days
    daysNames: string[];
    /// Array with numbers of days in a month
    daysNumbers: { day: number, isCurrentMonth: boolean }[];
    /// Name of current Month
    currentMonthName: string;
}

const props = defineProps<Props>()
const emit = defineEmits<{ closeSidebar: [] }>()
const eventsStore = useEventsStore()
</script>

<template>
    <div>
        <div class="sidebar-overlay" @click="emit('closeSidebar')"></div>
        <div class="sidebar-container">
            <div class="sidebar-title-container">
                <h2 class="sidebar-title"> {{ props.currentMonthName }} </h2>
            </div>
            <SideBarCalendar 
                :days-names="props.daysNames" 
                :is-today="props.isToday" 
                :days-numbers="props.daysNumbers"
            />
            <SideBarEvents
                :category-colors="eventsStore.categoryColors"
                :events="eventsStore.events"
            />
        </div>
    </div>
</template>

<style scoped lang="scss">
    .sidebar-overlay {
        display: none;
    }
    @media screen and (max-width: 750px) {
        .sidebar-overlay {
            display: block;
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: rgba(0, 0, 0, 0.3);
            z-index: 6;
        }
    }
    .sidebar-container {
        max-width: 250px;
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        border-right: 1px solid var(--border-color-primary);
        background-color: var(--bg-color-primary);
        z-index: 7;
    }
    .sidebar-title-container {
        padding: 10px 16px;
    }
    .sidebar-title {
        font-weight: 500;
        font-size: 18px;
    }
</style>