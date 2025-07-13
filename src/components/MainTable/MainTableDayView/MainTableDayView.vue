<script setup lang="ts">
import { computed } from 'vue'
import { useEventsStore } from '@/stores/events'

const eventsStore = useEventsStore()

const getEventsForHour = (hour: number) => {
    const today = new Date().toISOString().slice(0, 10)
    return eventsStore.events.filter(event => {
        const eventDate = new Date(event.date)
        const eventDay = eventDate.toISOString().slice(0, 10)
        const eventHour = eventDate.getHours()
        return eventDay === today && eventHour === hour
    })
}
</script>

<template>
    <div class="day-wrapper">
        <div class="hour-row" v-for="hour in 24" :key="hour">
            <div class="hour-label">{{ String(hour - 1).padStart(2, '0') }}:00</div>
            <div class="hour-content">
                <div 
                    v-for="event in getEventsForHour(hour - 1)" 
                    :key="event.id" 
                    class="event"
                    :style="{ backgroundColor: eventsStore.categoryColors[event.category] }"
                >
                    {{ event.name }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.day-wrapper {
    display: flex;
    flex-direction: column;
}

.hour-row {
    display: flex;
    height: 80px;
    border-bottom: 1px solid #e0e0e0;
}

.hour-label {
    width: 55px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: #666;
    border-right: 1px solid #e0e0e0;
}

.hour-content {
    flex: 1;
    display: flex;
    gap: 4px;
    padding: 4px;
}

.event {
    flex: 1;
    height: 72px;
    border-radius: 4px;
    color: white;
    font-size: 12px;
    font-weight: 500;
    padding: 8px;
    display: flex;
    align-items: flex-start;
}
</style>