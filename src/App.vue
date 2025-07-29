<script setup lang="ts">
import { ref } from 'vue';
import type { SelectOptionType } from './types';
import SideBar from './components/SideBar/SideBar.vue';
import TopBar from './components/TopBar/TopBar.vue';
import MainTable from './components/MainTable/MainTable.vue';
import { useCalendarStore } from './stores/calendar';

const { isToday, daysNames, daysNumbers, currentMonthName } = useCalendarStore()

const showSideBar = ref<boolean>(true)
const topBarStatus = ref<string>('')
const selectOption = ref<SelectOptionType>('day')

const changeSideBarStatus = (status: boolean) => {
  showSideBar.value = status
  status ? topBarStatus.value = '' : topBarStatus.value = ' full'
}
const changeSelectOption = (option: SelectOptionType) => {
  selectOption.value = option
}
</script>

<template>
  <div class="container">
    <SideBar 
      v-if="showSideBar" 
      :isToday="isToday"
      :daysNames="daysNames"
      :daysNumbers="daysNumbers"
      :currentMonthName="currentMonthName"
    />
    <TopBar 
      :showSideBar="showSideBar" 
      :addClass="topBarStatus" 
      @changeSideBarStatus="changeSideBarStatus" 
      @changeOption="changeSelectOption"
    />
    <MainTable
      :changeWidth="!showSideBar"
      :addClass="topBarStatus" 
      :selectOption="selectOption"
      :isToday="isToday"
      :daysNumbers="daysNumbers"
    />
  </div>
</template>

<style lang="scss" src="./main.scss"></style>
