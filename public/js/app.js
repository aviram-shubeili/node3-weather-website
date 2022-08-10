const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


const forecastURL = '/weather?address='

const fetchForecast = (address) => {
    fetchURL = forecastURL.concat(address)
    fetch(fetchURL).then(response => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
                return messageOne.textContent = data.error
            }
            console.log(data.location)
            console.log(data.forecast)
            messageOne.textContent = 'Location: '.concat(data.location)
            messageTwo.textContent = 'Forecast: '.concat(data.forecast)

        })
    })
}


// adssa


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetchForecast(search.value)


