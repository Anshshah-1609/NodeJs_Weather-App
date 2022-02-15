const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const mes1 = document.querySelector('#mes1')
const mes2 = document.querySelector('#mes2')
const mes3 = document.querySelector('#mes3')
const mes4 = document.querySelector('#mes4')
const mes5 = document.querySelector('#mes5')
const mes6 = document.querySelector('#mes6')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    fetch('http://localhost:3000/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if (data.location === undefined) {
                mes1.textContent = 'Loading ..'
                mes2.textContent = ''
                mes3.textContent = ''
                mes4.textContent = ''
                mes5.textContent = ''
                mes6.textContent = ''
                setTimeout(() => {
                    mes1.textContent = "Please Provide Valid Location"
                },2000)
            } else {
                mes1.textContent = '' 
                mes2.textContent = 'Loading ..'
                setTimeout(()=>{
                    mes2.textContent = data.location
                },1000)
                setTimeout(()=>{
                    mes3.textContent = 'Weather : ' + data.weather
                    mes4.textContent = 'Temperature : ' + data.temperature + ' °C' 
                    mes5.textContent = 'Feels Like : ' + data.feelslike + ' °C' 
                    mes6.textContent = 'Rain Probability : ' + data.rain_probability
                },1500)
            }
        })
    })
})