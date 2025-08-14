<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import type { SelectOptionType } from './types';
import SideBar from './components/SideBar/SideBar.vue';
import TopBar from './components/TopBar/TopBar.vue';
import MainTable from './components/MainTable/MainTable.vue';
import { useCalendarStore } from './stores/calendar';

const { isToday, daysNames, daysNumbers, currentMonthName } = useCalendarStore()

const showSideBar = ref<boolean>(true)
const topBarStatus = ref<string>('')
const selectOption = ref<SelectOptionType>('day')

const handleResize = () => {
  if (window.innerWidth <= 750) {
    showSideBar.value = false
    topBarStatus.value = ' full'
  } else {
    showSideBar.value = true
    topBarStatus.value = ''
  }
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

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
    <Transition name="sidebar">
      <SideBar 
        v-if="showSideBar" 
        :isToday="isToday"
        :daysNames="daysNames"
        :daysNumbers="daysNumbers"
        :currentMonthName="currentMonthName"
        @closeSidebar="changeSideBarStatus(false)"
      />
    </Transition>
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

<style scoped>
.sidebar-enter-active .sidebar-container,
.sidebar-leave-active .sidebar-container {
  transition: transform 0.3s ease;
}

.sidebar-enter-from .sidebar-container,
.sidebar-leave-to .sidebar-container {
  transform: translateX(-100%);
}
</style>
