import fetch from 'node-fetch'

export default (req, res) => {
    const { lat, lng } = req.query
    const { OPENWEATHER_API_KEY } = process.env
    const openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=imperial&appid=${OPENWEATHER_API_KEY}`
    fetch(openWeatherUrl)
        .then(response => response.json())
        .then(data => res.json(data))
        .catch(error => res.json(error))
}