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
                <button type="submit" class="modal-btn"> Add event </button>
            </form>
        </div>
    </div>
</template>

<style src="./style.scss" scoped lang="scss"></style>