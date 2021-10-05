// DOM Elements
const time = document.querySelector('#time')
const greeting = document.querySelector('#greeting')
const my_name = document.querySelector('#name')
const focus = document.querySelector('#focus')

// Show the time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    minute = today.getMinutes(),
    second = today.getSeconds()

  // Set AM or PM
  const amPM = hour >= 12 ? 'PM' : 'AM'

  // 12hr Format
  hour = hour % 12 || 0

  // Output  the time
  time.innerHTML = `${hour}:${addZeroToTime(minute)}:${addZeroToTime(
    second
  )} ${amPM}`
  setTimeout(showTime, 1000)
}
function addZeroToTime(time) {
  return time < 10 ? '0' + time : time
}

// Set Background and Greeting
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours()
  if (hour < 12 && hour >= 7) {
    //Morning
    document.body.style.backgroundImage = "url('img/morning.jpg')"
    greeting.innerHTML = 'Good Morning'
  } else if (hour >= 12 && hour < 18) {
    // Afternoon
    document.body.style.backgroundImage = "url('img/afternoon.jpg')"
    greeting.innerHTML = 'Good Afternoon'
  } else {
    // Evening
    document.body.style.backgroundImage = "url('img/evening.jpg')"
    document.body.style.color = 'white'
    greeting.innerHTML = 'Good Evening'
  }
}

// Get Name
function GetName() {
  if (localStorage.getItem('name') === null) {
    my_name.textContent = '[Enter Name]'
  } else {
    my_name.textContent = localStorage.getItem('name')
  }
}

function SetName(e) {
  if (e.type === 'keypress') {
    // 13 is enter key
    console.log(e.which)
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('name', my_name.textContent)
      my_name.blur()
    }
  } else {
    localStorage.setItem('name', my_name.textContent)
  }
}

function SetFocus(e) {
  if (e.type === 'keypress') {
    // 13 is enter key
    console.log(e.which)
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', focus.textContent)
      focus.blur()
    }
  } else {
    localStorage.setItem('focus', focus.textContent)
  }
}
function GetFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]'
  } else {
    focus.textContent = localStorage.getItem('focus')
  }
}

my_name.addEventListener('keypress', SetName)
my_name.addEventListener('blur', SetName)
focus.addEventListener('keypress', SetFocus)
focus.addEventListener('blur', SetFocus)
// Run
showTime()
setBgGreet()
GetName()
GetFocus()
