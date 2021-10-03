const submitBtn = document.querySelector('#submit')
const english = document.querySelector('#english')
const chinese = document.querySelector('#chinese')
const mapTable = document.querySelector('#map_table')
const templateWordMap = document.querySelector('#template_word_map')
const changePaperBtn = document.querySelector('#change-paper-btn')
const paperTextArea = document.querySelector('#paper')
const paperDisplay = document.querySelector('#paper-display')
const paperModifier = document.querySelector('#paper-modifier')
const paperModifierTextArea = document.querySelector('#paper-modifier-textarea')
const paperModifierDoneBtn = document.querySelector('#paper-modifer-btn-done')

submitBtn.addEventListener('click', (e) => {
  e.preventDefault()
  const ec_map = {
    en: english.value,
    ch: chinese.value,
  }
  english.value = ''
  chinese.value = ''
  console.log(ec_map)
  const wordMapElement = templateWordMap.content.cloneNode(true)
  console.log(wordMapElement.querySelector('#map-english').innerText)
  wordMapElement.querySelector('#map-english').innerText = ec_map.en
  wordMapElement.querySelector('#map-chinese').innerText = ec_map.ch
  mapTable.appendChild(wordMapElement)
})

changePaperBtn.addEventListener('click', () => {
  paperModifierTextArea.value = paperDisplay.innerText
  paperModifier.classList.remove('invisible')
})

paperModifierDoneBtn.addEventListener('click', () => {
  paperDisplay.innerText = paperModifierTextArea.value
  paperModifier.classList.add('invisible')
})
