import { useFetchWeather } from "../hooks/useFetchWeather";

export default function WeatherWidget() {
  const weatherData = useFetchWeather();

  if (!weatherData) return <div>Loading weather...</div>;

  return (
    <div>
      <h2>Current: {weatherData.current.temperature_2m}°C</h2>
      <ul>
        {weatherData.hourly.time.map((t, i) => (
          <li key={i}>
            {t.toLocaleTimeString()}: {weatherData.hourly.temperature_2m[i]}°C
          </li>
        ))}
      </ul>
    </div>
  );
}
