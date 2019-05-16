const formvalue = document.querySelector('form')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')
const inpt = document.querySelector('input')

formvalue.addEventListener('submit',(e) => {
    e.preventDefault()
    const valuee = inpt.value

    msg1.textContent = 'loading ...'
    fetch(`http://localhost:3000/weather?address=${valuee}`).then((response)=> {
        response.json().then((data) => {
            if (data.error) {
                msg1.textContent = data.error
            } else {
                msg1.textContent = data.location 
                msg2.textContent = data.weather
            }
        })
    })
})



function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log( "Geolocation is not supported by this browser.")
  }
}

function showPosition(position) {
console.log(position.coords.latitude + position.coords.longitude)
}
getLocation()