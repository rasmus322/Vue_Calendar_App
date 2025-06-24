import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useCalendarStore = defineStore('calendar', () => {
  const currentMonth = ref(new Date().getMonth())
  const currentMonthName = computed(() => {
    return new Date(currentYear.value, currentMonth.value).toLocaleString('en-US', { month: 'long' })
  })
  const currentYear = ref(new Date().getFullYear())
  const daysNames = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

  const daysNumbers = computed(() => {
    const daysCount = new Date(currentYear.value, currentMonth.value + 1, 0).getDate()

    return Array.from({ length: daysCount }, (_, i) => i + 1)
  })

  const isToday = computed(() => {
    const today = new Date().getDate()
    console.log(daysNumbers.value.map((day) => day === today))

    return daysNumbers.value.map((day) => day === today)
  })

  return {
    currentMonth,
    currentMonthName,
    currentYear,
    daysNames,
    daysNumbers,
    isToday
  }
})