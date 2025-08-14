<script setup lang="ts">
import { Event, useEventsStore } from '@/stores/events';
import { defineEmits, ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';

const emit = defineEmits(['close'])

const { createEvent } = useEventsStore()

const formData = ref<Event>({
    id: uuidv4(),
    name: '',
    date: new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16),
    category: 'work',
    completed: false
})
</script>

<template>
    <div class="modal-backdrop" @click="emit('close')">
        <div class="modal-container" @click.stop>
            <h3 class="modal-title">
                Add your event
            </h3>
            <form class="modal-form" @submit.prevent="createEvent(formData), emit('close')">
                <input 
                    class="modal-input-text" 
                    v-model="formData.name" 
                    type="text" 
                    placeholder="Name of event" 
                    required
                >
                <label for="category-select" class="modal-label"> Choose category of your event </label>
                <div class="select-wrapper">
                    <select v-model="formData.category" name="category-select" class="modal-select">
                        <option value="work" class="modal-select-option"> Work </option>
                        <option value="entertainment" class="modal-select-option"> Entertainment </option>
                        <option value="sport" class="modal-select-option"> Sport </option>
                        <option value="health" class="modal-select-option"> Health </option>
                        <option value="other" class="modal-select-option"> Other </option>
                    </select>
                </div>
                <label for="date-picker" class="modal-label"> Choose date of your event </label>
                <input 
                    name="date-picker" 
                    class="modal-input-date" 
                    type="datetime-local"
                    v-model="formData.date" 
                    required
                >
                <button type="submit" class="modal-btn">
                    Add event
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.49998 0.833344C3.81718 0.833344 0.833313 3.81721 0.833313 7.50001C0.833313 11.1828 3.81718 14.1667 7.49998 14.1667C11.1828 14.1667 14.1666 11.1828 14.1666 7.50001C14.1666 3.81721 11.1828 0.833344 7.49998 0.833344ZM11.3709 8.2527C11.3709 8.43012 11.2258 8.57528 11.0484 8.57528H8.57525V11.0484C8.57525 11.2258 8.43009 11.371 8.25267 11.371H6.74729C6.56987 11.371 6.42471 11.2258 6.42471 11.0484V8.57528H3.95159C3.77417 8.57528 3.62901 8.43012 3.62901 8.2527V6.74732C3.62901 6.5699 3.77417 6.42474 3.95159 6.42474H6.42471V3.95162C6.42471 3.7742 6.56987 3.62904 6.74729 3.62904H8.25267C8.43009 3.62904 8.57525 3.7742 8.57525 3.95162V6.42474H11.0484C11.2258 6.42474 11.3709 6.5699 11.3709 6.74732V8.2527Z" fill="white"/>
                    </svg>
                </button>
            </form>
        </div>
    </div>
</template>

<style src="./style.scss" scoped lang="scss"></style>