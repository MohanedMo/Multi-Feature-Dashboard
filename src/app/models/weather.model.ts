export interface CurrentWeather {
  location: string;
  country: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  feelsLike: number;
  visibility: number;
  uvIndex: number;
  icon: string;
  timestamp: Date;
}

export interface ForecastDay {
  date: Date;
  maxTemp: number;
  minTemp: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

export interface WeatherForecast {
  location: string;
  country: string;
  forecast: ForecastDay[];
}

export interface WeatherApiResponse {
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  visibility: number;
  dt: number;
}

export interface ForecastApiResponse {
  city: {
    name: string;
    country: string;
  };
  list: Array<{
    dt: number;
    main: {
      temp_max: number;
      temp_min: number;
      humidity: number;
    };
    weather: Array<{
      main: string;
      description: string;
      icon: string;
    }>;
    wind: {
      speed: number;
    };
  }>;
}
