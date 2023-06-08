import fetch from 'node-fetch'

export default (req, res) => {
    const { lat, lng } = req.query
    const { GOOGLEPLACES_API_KEY } = process.env
    const googlePlacesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=restaurant&key=${GOOGLEPLACES_API_KEY}`
    fetch(googlePlacesUrl)
        .then(response => response.json())
        .then(data => res.json(data))
        .catch(error => res.json(error))
}