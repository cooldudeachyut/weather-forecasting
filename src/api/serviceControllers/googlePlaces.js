import fetch from "node-fetch";

export default async (req, res) => {
  const { location } = req.query;
  const { GOOGLEMAPS_API_KEY } = process.env;
  const googlePlacesUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${location}&key=${GOOGLEMAPS_API_KEY}`;

  fetch(googlePlacesUrl)
    .then((response) => response.json())
    .then((data) => {
      let googleMapsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${data.predictions[0].place_id}&key=${GOOGLEMAPS_API_KEY}`;
      fetch(googleMapsUrl)
        .then((response) => response.json())
        .then((data) => res.json(data.result.geometry.location))
        .catch((error) => res.json(error));
    })
    .catch((error) => res.json(error));
};
