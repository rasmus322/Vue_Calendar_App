<script setup lang="ts">
import { ref } from 'vue';
import type { SelectOptionType } from './types';
import SideBar from './components/SideBar/SideBar.vue';
import TopBar from './components/TopBar/TopBar.vue';
import MainTable from './components/MainTable/MainTable.vue';

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
    <SideBar v-if="showSideBar" />
    <TopBar 
      :showSideBar="showSideBar" 
      :addClass="topBarStatus" 
      @changeSideBarStatus="changeSideBarStatus" 
      @changeOption="changeSelectOption"
    />
    <MainTable :addClass="topBarStatus" :selectOption="selectOption"/>
  </div>
</template>

<style lang="scss" src="./main.scss"></style>
