import { fetchWeatherApi } from 'openmeteo';


export default function WeatherWidget () {

  const fruits = usefruits()
  if (!fruits)

  return loading..
}



// Process first location. Add a for-loop for multiple locations or weather models
// const response = responses[0];

// Attributes for timezone and location
// const latitude = response.latitude();
// const longitude = response.longitude();
// const elevation = response.elevation();
// const timezone = response.timezone();
// const timezoneAbbreviation = response.timezoneAbbreviation();
// const utcOffsetSeconds = response.utcOffsetSeconds();

// console.log(
// 	`\nCoordinates: ${latitude}°N ${longitude}°E`,
// 	`\nElevation: ${elevation}m asl`,
// 	`\nTimezone: ${timezone} ${timezoneAbbreviation}`,
// 	`\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`,
// );

// const current = response.current()!;
// const hourly = response.hourly()!;

// // Note: The order of weather variables in the URL query and the indices below need to match!
// const weatherData = {
// 	current: {
// 		time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
// 		temperature_2m: current.variables(0)!.value(),
// 		wind_speed_10m: current.variables(1)!.value(),
// 		is_day: current.variables(2)!.value(),
// 		precipitation: current.variables(3)!.value(),
// 	},
// 	hourly: {
// 		time: Array.from(
// 			{ length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval() }, 
// 			(_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
// 		),
// 		temperature_2m: hourly.variables(0)!.valuesArray(),
// 		precipitation: hourly.variables(1)!.valuesArray(),
// 		precipitation_probability: hourly.variables(2)!.valuesArray(),
// 	},
// };

// // 'weatherData' now contains a simple structure with arrays with datetime and weather data
// console.log(
// 	`\nCurrent time: ${weatherData.current.time}`,
// 	`\nCurrent temperature_2m: ${weatherData.current.temperature_2m}`,
// 	`\nCurrent wind_speed_10m: ${weatherData.current.wind_speed_10m}`,
// 	`\nCurrent is_day: ${weatherData.current.is_day}`,
// 	`\nCurrent precipitation: ${weatherData.current.precipitation}`,
// );
// console.log("\nHourly data", weatherData.hourly)