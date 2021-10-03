/**
 * Current Date:
 * Selected Date: The date selected.
 */
import {
  format,
  fromUnixTime,
  getUnixTime,
  addMonths,
  subMonths,
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMinute,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
} from 'date-fns'

const datePickerButton = document.querySelector('.date-picker-button')
const datePicker = document.querySelector('.date-picker')
const datePickerHeaderText = document.querySelector('.current-month')
const prevMonthButton = document.querySelector('.prev-month-button')
const nextMonthButton = document.querySelector('.next-month-button')
const dateGrid = document.querySelector('.date-picker-grid-dates')
let currentDate = new Date()
let selectedDate = currentDate

datePickerButton.addEventListener('click', () => {
  datePicker.classList.toggle('show')
})

function setupDatePicker(selectedDate) {
  datePickerHeaderText.innerText = format(currentDate, 'MMMM - yyyy')
  setupDates(selectedDate)
}

nextMonthButton.addEventListener('click', () => {
  const selectedDate = fromUnixTime(datePickerButton.dataset.selectedDate)
  currentDate = addMonths(currentDate, 1)
  setupDatePicker(selectedDate)
})

prevMonthButton.addEventListener('click', () => {
  const selectedDate = fromUnixTime(datePickerButton.dataset.selectedDate)
  currentDate = subMonths(currentDate, 1)
  setupDatePicker(selectedDate)
})

function setupDates(selectedDate) {
  dateGrid.innerHTML = ''

  const firstWeekStart = startOfWeek(startOfMonth(currentDate))
  const lastWeekEnd = endOfWeek(endOfMonth(currentDate))
  const dates = eachDayOfInterval({ start: firstWeekStart, end: lastWeekEnd })
  console.log(dates)

  dates.forEach((date) => {
    const dateElement = document.createElement('button')
    dateElement.classList.add('date')
    dateElement.innerText = date.getDate()

    if (!isSameMonth(date, currentDate)) {
      dateElement.classList.add('date-picker-other-month-date')
    }
    if (isSameDay(date, selectedDate)) {
      dateElement.classList.add('selected')
    }
    dateElement.addEventListener('click', () => {
      setDate(date)
      datePicker.classList.remove('show')
    })

    dateGrid.appendChild(dateElement)
  })
}

/***
 *
 */
function setDate(date) {
  datePickerButton.innerText = format(date, 'MMMM do, yyyy')
  datePickerButton.dataset.selectedDate = getUnixTime(date)
  setupDatePicker(date)
}

setDate(selectedDate)

/**
 * setDate -> setupDatePicker -> header text + setupDates()
 *
 */
