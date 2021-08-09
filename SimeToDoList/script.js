// 1. Select all elements
// 2. When I submit the form, add a new element.


const list = document.querySelector('#list')
const form = document.querySelector('form')
const input = document.querySelector('#item-input')

form.addEventListener('submit', (e)=>{
	e.preventDefault()
	const item = document.createElement('div')
	item.classList.add('list-item')
	item.innerText = input.value
	item.addEventListener('click', () => {
		// list.removeChild(item)
		item.remove()
	})
	list.appendChild(item)	
	input.value = ""
})
