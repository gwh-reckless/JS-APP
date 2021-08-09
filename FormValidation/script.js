// TODO: Select all elements needed
//    Use the HTML to figure out what classes/ids will work best for selecting each element
const form = document.querySelector('#form')
const username = document.querySelector('#username')
const password = document.querySelector('#password')
const password_confirmation = document.querySelector('#password-confirmation')
const terms = document.querySelector('#terms')
const errors_list = document.querySelector('.errors-list')
const errors = document.querySelector('.errors')

// TODO: Create an event listener for when the form is submitted and do the following inside of it.
//    TODO: Create an array to store all error messages and clear any old error messages
//    TODO: Define the following validation checks with appropriate error messages
//      1. Ensure the username is at least 6 characters long
//      2. Ensure the password is at least 10 characters long
//      3. Ensure the password and confirmation password match
//      4. Ensure the terms checkbox is checked
//    TODO: If there are any errors then prevent the form from submitting and show the error messages
form.addEventListener('submit', (e) => {
  clearErrors()
  const errors = []
  if (username.value.length < 6)
    errors.push('Username should be at least 6 characters long')
  if (password.value.length < 10)
    errors.push('Password should be at least 10 characters long')
  if (password.value !== password.value)
    errors.push('Password should be the same')
  if (!terms.checked) errors.push('Terms should be accepted')
  if (errors.length > 0) {
    e.preventDefault()
    showErrors(errors)
  }
})

// TODO: Define this function
function clearErrors() {
  // Loop through all the children of the error-list element and remove them
  // IMPORTANT: This cannot be done with a forEach loop or a normal for loop since as you remove children it will modify the list you are looping over which will not work
  // I recommend using a while loop to accomplish this task
  // This is the trickiest part of this exercise so if you get stuck and are unable to progress you can also set the innerHTML property of the error-list to an empty string and that will also clear the children. I recommend trying to accomplish this with a while loop, though, for practice.
  // Also, make sure you remove the show class to the errors container
  Array.from(errors_list.children).forEach((err) => err.remove())
  errors.classList.remove('show')
}

// TODO: Define this function
function showErrors(errorMessages) {
  // Add each error to the error-list element
  // Make sure to use an li as the element for each error
  // Also, make sure you add the show class to the errors container
  console.log(errorMessages)
  errorMessages.forEach((error) => {
    const err = document.createElement('li')
    err.innerText = error
    console.log(err)
    errors_list.appendChild(err)
  })
  errors.classList.add('show')
}
