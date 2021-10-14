const app = () => {
  const song = document.querySelector('.song')
  const play = document.querySelector('.play')
  const outline = document.querySelector('.moving-outline circle')
  const video = document.querySelector('.vid-container video')

  // Sounds
  const sounds = document.querySelectorAll('.sound-picker button')

  //Time Display
  const timeDisplay = document.querySelector('.time-display')

  // Time Select button
  const timeSelect = document.querySelectorAll('.time-select button')

  //Get the length of the outline
  const outlineLength = outline.getTotalLength()

  //Duration
  let fakeDuration = 60
  outline.style.strokeDasharray = outlineLength
  outline.style.strokeDashoffset = outlineLength
  //   outline.style.strokeDashoffset = 400

  // Pick differnt Sound
  sounds.forEach((sound) => {
    console.log(sound)
    sound.addEventListener('click', function () {
      song.src = this.getAttribute('data-sound')
      video.src = this.getAttribute('data-video')
      checkPlaying(song)
    })
  })

  //play sound
  play.addEventListener('click', () => {
    checkPlaying(song)
  })

  // Select sound
  timeSelect.forEach((option) => {
    option.addEventListener('click', function () {
      fakeDuration = this.getAttribute('data-time')
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
        fakeDuration % 60
      )}`
    })
  })

  // Creat a function specific to stop and play the sounds
  const checkPlaying = (song) => {
    console.log(song.paused)
    if (song.paused) {
      song.play()
      video.play()
      play.src = './svg/pause.svg'
    } else {
      song.pause()
      play.src = './svg/play.svg'
      video.pause()
    }
  }

  song.ontimeupdate = () => {
    let currentTime = song.currentTime
    console.log(currentTime)
    let elapsed = fakeDuration - currentTime
    let seconds = Math.floor(elapsed % 60)
    let minutes = Math.floor(elapsed / 60)

    //Animate the circle
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength
    outline.style.strokeDasharray = progress

    //Animate the text
    timeDisplay.textContent = `${minutes}:${seconds}`

    if (currentTime > fakeDuration) {
      song.pause()
      song.currentTime = 0
      play.src = './svg/play.svg'
      video.pause()
    }
  }
}

app()
