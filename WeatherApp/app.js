const degree = document.querySelector('.temperature-degree')
const temperatureDescription = document.querySelector(
  '.temperature-description'
)
const timeZone = document.querySelector('.location-timezone')

window.addEventListener('load', () => {
  let long
  let lat

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        long = position.coords.longitude
        lat = position.coords.latitude
        console.log(lat + ',' + long)

        const url = new URL(
          'https://visual-crossing-weather.p.rapidapi.com/forecast'
        )
        var params = {
          location: lat + ',' + long,
          aggregateHours: '24',
          shortColumnNames: '0',
          contentType: 'json',
        }
        url.search = new URLSearchParams(params).toString()
        console.log(url)

        fetch(url, {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'visual-crossing-weather.p.rapidapi.com',
            'x-rapidapi-key':
              'd68467eb7bmsh24c175482aa583ep15bfe2jsn06a70c188323',
          },
          mode: 'cors',
        })
          .then((response) => {
            return response.json()
          })
          .then((data) => {
            const weather = data.locations[lat + ',' + long].values[0]
            const temp = weather.mint
            const condition = weather.conditions
            degree.innerText = temp
            temperatureDescription.innerText = condition
            const icon = condition
            setIcons(icon, document.querySelector('.icon'))
          })

        // const api_key_position_stack = '7b2f010edc55379a70abd531ef2a4a69'
        const url_position_stack = `http://api.positionstack.com/v1/reverse?access_key=7b2f010edc55379a70abd531ef2a4a69&query=${lat},${long}`
        console.log(url_position_stack)
        console.log(url_position_stack)
        fetch(url_position_stack, {
          mode: 'cors',
          referrerPolicy: 'no-referrer',
        })
          .then((resp) => resp.json())
          .then((obj) => {
            const label = obj.data[0].label
            timeZone.innerText = label
          })
      },
      (err) => {
        console.log(err)
      },
      options
    )
  } else {
    alert('Please allow  to use geo location')
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: 'white' })

    skycons.add(document.getElementById('icon1'), Skycons.PARTLY_CLOUDY_DAY)
    skycons.play()
    console.log(currentIcon)
  }

  function iconMap(icon) {}
})
