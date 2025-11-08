export interface WeatherCurrent {
  time: Date;
  temperature_2m: number;
  wind_speed_10m: number;
  is_day: number;
  precipitation: number;
}

export interface WeatherHourly {
  time: Date[];
  temperature_2m: number[];
  precipitation: number[];
  precipitation_probability: number[];
}

export interface WeatherData {
  current: WeatherCurrent;
  hourly: WeatherHourly;
}
