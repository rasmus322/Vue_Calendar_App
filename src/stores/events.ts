import { defineStore } from "pinia";
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid"
import { EventCategory } from "@/types";

export interface Event {
    /// Id of event
    id: string;
    /// Name of event
    name: string;
    /// Date and time by which the event must be completed
    date: string;
    /// Category of event
    category: EventCategory;
    /// Flag that tells if the event is completed
    completed: boolean;
}

export const useEventsStore = defineStore('eventsStore', () => {
    const categoryColors: Record<EventCategory, string> = {
        work: '#BE1A1A',
        entertainment: '#E7C160',
        sport: '#2937B5',
        health: '#3BA86E',
        other: '#A384FF',
        
    }

    const events = ref<Event[]>([
        {
            id: uuidv4(),
            name: 'go ride a bike',
            date: new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16),
            category: 'sport',
            completed: false
        },
        {
            id: uuidv4(),
            name: 'go to the gym',
            date: new Date(Date.now() + 24 * 60 * 60 * 1000 - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16),
            category: 'sport',
            completed: false
        },
        {
            id: uuidv4(),
            name: 'test task',
            date: new Date(Date.now() + 4 * 60 * 45 * 1000 - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16),
            category: 'other',
            completed: true   
        }
    ])

    const createEvent = (event: Event) => {
        events.value.push(event)
    }

    return { 
        categoryColors,
        events,
        createEvent
    }
})