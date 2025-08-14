import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

interface Day {
  /// Day number
  day: number;
  /// Flag that tells if month is current
  isCurrentMonth: boolean;
}

export const useCalendarStore = defineStore('calendarStore', () => {
  const currentMonth = ref(new Date().getMonth())
  const currentMonthName = computed(() => {
    return new Date(currentYear.value, currentMonth.value).toLocaleString('en-US', { month: 'long' })
  })
  const currentYear = ref(new Date().getFullYear())
  const daysNames = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

  const daysNumbers = computed(() => {
    const firstDay = new Date(currentYear.value, currentMonth.value, 1)
    const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0)
    const daysCount = lastDay.getDate()
    
    const firstDayOfWeek = (firstDay.getDay() + 6) % 7
    const lastDayOfWeek = (lastDay.getDay() + 6) % 7
    
    const days: Day[] = []
  
    if (firstDayOfWeek > 0) {
      const prevMonthDays = new Date(currentYear.value, currentMonth.value, 0).getDate()
      for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        days.push({ day: prevMonthDays - i, isCurrentMonth: false })
      }
    }
    
    for (let i = 1; i <= daysCount; i++) {
      days.push({ day: i, isCurrentMonth: true })
    }
    
    if (lastDayOfWeek < 6) {
      for (let i = 1; i <= 6 - lastDayOfWeek; i++) {
        days.push({ day: i, isCurrentMonth: false })
      }
    }
    
    return days
  })

  const isToday = computed(() => {
    const date = new Date()
    const today = date.getDate()
    const todayMonth = date.getMonth()
    
    return daysNumbers.value.map((dayObj) => 
      dayObj.day === today && dayObj.isCurrentMonth && currentMonth.value === todayMonth
    )
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