import googlePlaces from "./serviceControllers/googlePlaces.js";
import openWeather from "./serviceControllers/openWeather.js";
import express from "express";
import dotenv from "dotenv";
import { dirname } from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();

const app = express();
const port = 4000;

app.engine("html", ejs.renderFile);
app.set("view engine", "html");

app.get("/api/v1/googlePlaces", googlePlaces);

app.get("/api/v1/weather", openWeather);

app.get("/map", (req, res) => {
  const { GOOGLEMAPS_API_KEY } = process.env;
  const { lat: latitude, lng: longitude, zoom = '8' } = req.query;
  res.render(__dirname + "/views/map.html", {
    googleAPIKey: GOOGLEMAPS_API_KEY,
    latitude,
    longitude,
    zoom
  });
});

app.listen(port, () =>
  console.log(`Backend API listening on port ${port}!`)
);
