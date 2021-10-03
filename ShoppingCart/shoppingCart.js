import items from './items.json'
import formatCurrency from './util/formatCurrency'
const URL = 'https://dummyimage.com/420x260/'

let shoppingCart = loadCart()

const shopButton = document.querySelector('[data-shop-button]')
const shopCart = document.querySelector('[data-shop-cart]')
const shopCartWrapper = document.querySelector('[data-shop-cart-wrapper')
const shopCartTotal = document.querySelector('[data-cart-total]')
const shopCartTotalAmount = document.querySelector('[data-cart-total-amount]')
const SESSION_STORAGE_KEY = 'SHOPPING_CART-cart'

export function showShopCart() {
  shopCart.classList.remove('invisible')
}
shopButton.addEventListener('click', () => {
  shopCart.classList.toggle('invisible')
})

export function addToCart(id) {
  const existingItem = shoppingCart.find((e) => e.id === id)
  if (existingItem) {
    existingItem.quantity = existingItem.quantity + 1
  } else {
    shoppingCart.push({ id: id, quantity: 1 })
  }
  saveCart()
}

export function renderCart() {
  shopCartWrapper.innerHTML = ''
  let total = 0
  let amount = 0
  shoppingCart.forEach((item) => {
    const shopItem = items.find((i) => i.id === item.id)

    const itemElement = document
      .querySelector('#cart-item-template')
      .content.cloneNode(true)
    const itemImg = itemElement.querySelector('[data-cart-img]')
    itemImg.src = URL + shopItem.imageColor + '/' + shopItem.imageColor
    const itemName = itemElement.querySelector('[data-cart-name]')
    itemName.innerText = shopItem.name
    const itemPrice = itemElement.querySelector('[data-cart-price]')
    itemPrice.innerText = formatCurrency(shopItem.priceCents / 100)
    const itemQuantity = itemElement.querySelector('[data-cart-quantity]')
    itemQuantity.innerText = 'x' + item.quantity

    const itemRmBtn = itemElement.querySelector('[data-cart-rm-btn]')
    itemRmBtn.addEventListener('click', () => {
      removeFromCart(item.id)
    })

    shopCartWrapper.appendChild(itemElement)
    total += shopItem.priceCents * item.quantity
    amount += item.quantity
  })
  shopCartTotal.innerText = formatCurrency(total / 100)
  shopCartTotalAmount.innerText = amount
}

function removeFromCart(id) {
  const existingItem = shoppingCart.find((entry) => entry.id === id)
  if (existingItem == null) return
  shoppingCart = shoppingCart.filter((entry) => entry.id != id)
  renderCart()
  saveCart()
}

export function setupShoppingCart() {
  loadCart()
  renderCart()
}

function saveCart() {
  sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(shoppingCart))
}

function loadCart() {
  const cart = sessionStorage.getItem(SESSION_STORAGE_KEY)
  console.log(cart)
  shoppingCart = JSON.parse(cart) || []
}
