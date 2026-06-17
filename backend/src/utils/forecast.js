const wmoCodes = {
  0: "Cielo sereno",
  1: "Prevalentemente sereno",
  2: "Parzialmente nuvoloso",
  3: "Coperto",
  45: "Nebbia",
  48: "Nebbia con brina",
  51: "Pioviggine leggera",
  53: "Pioviggine moderata",
  55: "Pioviggine fitta",
  61: "Pioggia leggera",
  63: "Pioggia moderata",
  65: "Pioggia forte",
  71: "Neve leggera",
  73: "Neve moderata",
  75: "Neve forte",
  95: "Temporale",
  96: "Temporale con grandine leggera",
  99: "Temporale con grandine forte",
};

export const normalizeForecastData = (rawData) => {
  if (!rawData || !rawData.daily || !rawData.daily.time) {
    throw new Error("Dati forecast grezzi non validi o mancanti");
  }

  const { daily } = rawData;
  const normalizedDays = [];

  for (let i = 0; i < daily.time.length; i++) {
    const weatherCode = daily.weather_code[i];

    normalizedDays.push({
      date: daily.time[i],
      weatherCode,
      description: wmoCodes[weatherCode] || "Condizioni sconosciute",
      temperatureMin: daily.temperature_2m_min[i],
      temperatureMax: daily.temperature_2m_max[i],
      precipitationProbability: daily.precipitation_probability_max[i],
      windSpeed: daily.wind_speed_10m_max[i],
    });
  }

  return normalizedDays.slice(0, 5);
};

export const normalizeHourlyData = (rawData) => {
  if (!rawData?.hourly?.time) {
    return [];
  }

  const { hourly } = rawData;

  // prendo il fuso orario dalla risposta per confrontare con l'ora locale
  const nowIso = rawData.current?.time
    ? new Date(rawData.current.time)
    : new Date();

  return hourly.time
    .map((time, i) => {
      const weatherCode = hourly.weather_code[i];
      return {
        time,
        temperature: hourly.temperature_2m[i],
        weatherCode,
        description: wmoCodes[weatherCode] || "Condizioni sconosciute",
        precipitationProbability: hourly.precipitation_probability[i],
        windSpeed: hourly.wind_speed_10m[i],
        apparentTemperature: hourly.apparent_temperature[i],
      };
    })
    .filter((item) => new Date(item.time) >= nowIso)
    .slice(0, 24);
};

export const normalizeCurrentData = (rawData) => {
  if (!rawData?.current) {
    return null;
  }

  const { current } = rawData;
  const weatherCode = current.weather_code;

  return {
    time: current.time,
    temperature: current.temperature_2m,
    apparentTemperature: current.apparent_temperature,
    weatherCode,
    description: wmoCodes[weatherCode] || "Condizioni sconosciute",
    windSpeed: current.wind_speed_10m,
    humidity: current.relative_humidity_2m,
    pressure: current.surface_pressure,
  };
};