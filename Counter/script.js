const newYears = '30 Oct 2021'
const day_el = document.querySelector('#days')
const hour_el = document.querySelector('#hours')
const min_el = document.querySelector('#mins')
const second_el = document.querySelector('#seconds')

function countdown() {
  const newYearsDate = new Date(newYears)
  const currentDate = new Date()
  let sub_seconds = newYearsDate - currentDate
  sub_seconds = Math.round(sub_seconds / 1000)
  const days = Math.round(sub_seconds / (24 * 60 * 60))
  sub_seconds = sub_seconds % (24 * 60 * 60)
  const hours = Math.round(sub_seconds / (60 * 60))
  sub_seconds = sub_seconds % (60 * 60)
  const minutes = Math.round(sub_seconds / 60)
  const seconds = sub_seconds % 60

  day_el.textContent = days
  hour_el.textContent = hours
  min_el.textContent = minutes
  second_el.textContent = seconds
}

setInterval(countdown, 1000)
