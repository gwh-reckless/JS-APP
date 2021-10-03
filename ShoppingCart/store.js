import items from './items.json'
import {
  setupShoppingCart,
  addToCart,
  renderCart,
  showShopCart,
} from './shoppingCart'
import formatCurrency from './util/formatCurrency.js'

setupShoppingCart()

const URL = 'https://dummyimage.com/420x260/'
const storeItemTemplate = document.querySelector('#store-item-template')
const storeItemContainer = document.querySelector('[data-store-container]')

export function setupStore() {
  storeItemContainer.innerHTML = ''
  items.forEach(renderStoreItem)
}

function renderStoreItem(item) {
  const storeItem = storeItemTemplate.content.cloneNode(true)
  const container = storeItem.querySelector('[data-store-item]')
  container.dataset.itemId = item.id

  const name = storeItem.querySelector('[data-name]')
  name.innerText = item.name

  const category = storeItem.querySelector('[data-category')
  category.innerText = item.category

  const price = storeItem.querySelector('[data-price]')
  price.innerText = formatCurrency(item.priceCents / 100)

  const img = storeItem.querySelector('[data-img]')
  img.src = URL + item.imageColor + '/' + item.imageColor

  const btn = storeItem.querySelector('[data-add-to-cart-btn]')

  btn.addEventListener('click', () => {
    addToCart(item.id)
    renderCart()
    showShopCart()
  })

  storeItemContainer.appendChild(storeItem)
}

setupStore()
