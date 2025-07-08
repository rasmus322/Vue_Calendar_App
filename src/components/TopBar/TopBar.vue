<script setup lang="ts">
import { ref, defineEmits, defineProps, watch } from 'vue';
import type { SelectOptionType } from '@/types.ts';

interface Props {
    addClass: string;
    showSideBar: boolean;
}

const emits = defineEmits(['changeOption', 'changeSideBarStatus'])

const props = defineProps<Props>()

const selectOption = ref<SelectOptionType>('day')
const date = new Date()
const endOfWeek = new Date(date)
endOfWeek.setDate(date.getDate() + 6)

const dayTitle = `${date.getDate()} ${date.toLocaleString('en-US', { month: 'long' })}`
const weekTitle = `${date.getDate()}-${endOfWeek.getDate()} ${date.toLocaleString('en-US', { month: 'long' })}`
const monthTitle = date.toLocaleString('en-US', { month: 'long' })
const yearTitle = ''
const titleText = ref<string>(dayTitle)

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

        </section>
    </div>
</template>

<style scoped lang="scss" src="./style.scss"></style>