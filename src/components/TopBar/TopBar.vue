<script setup lang="ts">
import { ref, defineEmits, defineProps, watch } from 'vue';
import type { SelectOptionType } from '@/types.ts';
import CreateEventModal from '../CreateEventModal/CreateEventModal.vue';

interface Props {
    addClass: string;
    showSideBar: boolean;
}

const emits = defineEmits(['changeOption', 'changeSideBarStatus'])

const props = defineProps<Props>()

const showModal = ref<boolean>(false)

const selectOption = ref<SelectOptionType>('day')
const date = new Date()
const endOfWeek = new Date(date)
endOfWeek.setDate(date.getDate() + 6)

const dayTitle = `${date.getDate()} ${date.toLocaleString('en-US', { month: 'long' })}`
const weekTitle = `${date.getDate()}-${endOfWeek.getDate()} ${date.toLocaleString('en-US', { month: 'long' })}`
const monthTitle = date.toLocaleString('en-US', { month: 'long' })
const yearTitle = ''
const titleText = ref<string>(dayTitle)

const changeModalState = (status: boolean) => {
    showModal.value = status
}

watch(
    () => selectOption.value,
    () => {
        switch(selectOption.value) {
            case 'day':
                titleText.value = dayTitle
                break
            case 'week':
                titleText.value = weekTitle
                break
            case 'month':
                titleText.value = monthTitle
                break
            case 'year':
                titleText.value = yearTitle
                break
        }
    }
)
</script>

<template>
    <div :class="`topbar-container` + props.addClass">
        <section class="topbar-left">
            <div class="burger-btn" @click="emits('changeSideBarStatus', !props.showSideBar)">
                <span></span>
            </div>
            <h1 class="topbar-title"> {{ titleText }} <span>2025</span> </h1>
            <div class="select-wrapper">
                <select class="topbar-select" v-model="selectOption" @change="emits('changeOption', selectOption)">
                    <option class="topbar-select-option" value="day"> Day </option>
                    <option class="topbar-select-option" value="week"> Week </option>
                    <option class="topbar-select-option" value="month"> Month </option>
                    <option class="topbar-select-option" value="year"> Year </option>
                </select>
            </div>     
        </section>
        <section class="topbar-right">
            <button class="topbar-btn" @click="changeModalState(true)">
                Add event
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.49998 0.833344C3.81718 0.833344 0.833313 3.81721 0.833313 7.50001C0.833313 11.1828 3.81718 14.1667 7.49998 14.1667C11.1828 14.1667 14.1666 11.1828 14.1666 7.50001C14.1666 3.81721 11.1828 0.833344 7.49998 0.833344ZM11.3709 8.2527C11.3709 8.43012 11.2258 8.57528 11.0484 8.57528H8.57525V11.0484C8.57525 11.2258 8.43009 11.371 8.25267 11.371H6.74729C6.56987 11.371 6.42471 11.2258 6.42471 11.0484V8.57528H3.95159C3.77417 8.57528 3.62901 8.43012 3.62901 8.2527V6.74732C3.62901 6.5699 3.77417 6.42474 3.95159 6.42474H6.42471V3.95162C6.42471 3.7742 6.56987 3.62904 6.74729 3.62904H8.25267C8.43009 3.62904 8.57525 3.7742 8.57525 3.95162V6.42474H11.0484C11.2258 6.42474 11.3709 6.5699 11.3709 6.74732V8.2527Z" fill="white"/>
                </svg>
            </button>
        </section>
        <CreateEventModal v-if="showModal" @close="changeModalState(false)"/>
    </div>
</template>

<style scoped lang="scss" src="./style.scss"></style>