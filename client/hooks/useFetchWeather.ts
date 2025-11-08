import { useEffect, useState } from "react";
import { fetchWeatherApi } from "openmeteo";
import { WeatherData } from "../../models/weather";

// /home/ravidass/devacademy/bootcamp/november/DevConnect/client/hooks/useFetchWeather
// /home/ravidass/devacademy/bootcamp/november/DevConnect/models/weather.ts
const params = {
  latitude: -42,
  longitude: 174,
  hourly: ["temperature_2m", "precipitation", "precipitation_probability"],
  current: ["temperature_2m", "wind_speed_10m", "is_day", "precipitation"],
  timezone: "Pacific/Auckland",
  forecast_days: 1,
};

export function useFetchWeather() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetchWeatherApi(
          "https://api.open-meteo.com/v1/forecast",
          params
        );

        const current = {
          time: new Date(response.current.time * 1000),
          temperature_2m: response.current.temperature_2m,
          wind_speed_10m: response.current.wind_speed_10m,
          is_day: response.current.is_day,
          precipitation: response.current.precipitation,
        };

        const hourly = {
          time: response.hourly.time.map((t: number) => new Date(t * 1000)),
          temperature_2m: response.hourly.temperature_2m,
          precipitation: response.hourly.precipitation,
          precipitation_probability: response.hourly.precipitation_probability,
        };

        setWeatherData({ current, hourly });
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
      }
    };

    fetchWeather();
  }, []);

  return weatherData;
}
