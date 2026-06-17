import { Router } from "express";
import { searchLocations, getForecast } from "../services/openMeteo.service.js";
import {
  normalizeForecastData,
  normalizeHourlyData,
  normalizeCurrentData,
} from "../utils/forecast.js";

const router = Router();

// rotta 1 - ricerca località
router.get("/locations", async (req, res, next) => {
  try {
    const q = String(req.query.q || "").trim();

    if (q.length < 2) {
      return res.status(400).json({
        error: "Il parametro di ricerca 'q' deve contenere almeno 2 caratteri.",
      });
    }

    const locations = await searchLocations(q);
    res.status(200).json({ locations });
  } catch (error) {
    next(error);
  }
});

// rotta 2 - previsioni meteo (daily + hourly + current)
router.get("/forecast", async (req, res, next) => {
  try {
    const lat = parseFloat(req.query.lat);
    const lon = parseFloat(req.query.lon);

    if (Number.isNaN(lat) || lat < -90 || lat > 90) {
      return res.status(400).json({
        error: "Il parametro 'lat' deve essere un numero compreso tra -90 e 90.",
      });
    }

    if (Number.isNaN(lon) || lon < -180 || lon > 180) {
      return res.status(400).json({
        error: "Il parametro 'lon' deve essere un numero compreso tra -180 e 180.",
      });
    }

    const rawData = await getForecast(lat, lon);

    const forecast = normalizeForecastData(rawData);
    const hourly = normalizeHourlyData(rawData);
    const current = normalizeCurrentData(rawData);

    res.status(200).json({ forecast, hourly, current });
  } catch (error) {
    next(error);
  }
});

export default router;