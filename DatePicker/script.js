import {
  format,
  startOfMonth,
  startOfWeek,
  endOfMonth,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  subMonths,
  addMonths,
} from 'date-fns'

const datePickerButton = document.querySelector('.date-picker-button')
const datePicker = document.querySelector('.date-picker')
const datePickerHeader = document.querySelector('.current-month')
const dateGrid = document.querySelector('.date-picker-grid-dates')
const prevMonthButton = document.querySelector('.prev-month-button')
const nextMonthButton = document.querySelector('.next-month-button')
let currentDate = new Date()
let selectedDate = currentDate

prevMonthButton.addEventListener('click', () => {
  currentDate = subMonths(currentDate, 1)
  setDatePicker()
})

nextMonthButton.addEventListener('click', () => {
  currentDate = addMonths(currentDate, 1)
  setDatePicker()
})

datePickerButton.addEventListener('click', () => {
  datePicker.classList.toggle('show')
})

function setDatePicker() {
  datePickerHeader.innerText = format(currentDate, 'MMMM - yyyy')
  setupDates()
}

function setupDates() {
  dateGrid.innerHTML = ''
  const firstWeekStart = startOfWeek(startOfMonth(currentDate))
  const lastWeekEnd = endOfWeek(endOfMonth(currentDate))
  const dates = eachDayOfInterval({ start: firstWeekStart, end: lastWeekEnd })
  dates.forEach((d) => {
    const dateElement = document.createElement('button')
    dateElement.innerText = d.getDate()
    dateElement.classList.add('date')
    if (!isSameMonth(d, currentDate)) {
      dateElement.classList.add('date-picker-other-month-date')
    }
    if (isSameDay(d, selectedDate)) {
      dateElement.classList.add('selected')
    }
    dateElement.addEventListener('click', () => {
      selectedDate = d
      currentDate = d
      setDate()
      datePicker.classList.toggle('show')
    })

    dateGrid.appendChild(dateElement)
  })
}

function setDate() {
  datePickerButton.innerText = format(selectedDate, 'MMMM do, yyyy')
  setDatePicker()
}

setDate()
