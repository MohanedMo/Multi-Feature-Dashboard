import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {
  CurrentWeather,
  WeatherForecast,
  WeatherApiResponse,
  ForecastApiResponse,
  ForecastDay
} from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private readonly apiKey = 'f8508ef039a5e97a4ccad217da667773'; // Replace with your actual API key
  private readonly getCityBaseUrl = 'http://api.openweathermap.org/geo/1.0'
  private readonly baseUrl = 'https://api.openweathermap.org/data/2.5';

  private currentCitySubject = new BehaviorSubject<string>('New york');
  public currentCity$ = this.currentCitySubject.asObservable();

  private temperatureUnitSubject = new BehaviorSubject<'metric' | 'imperial'>('metric');
  public temperatureUnit$ = this.temperatureUnitSubject.asObservable();

  constructor(private http: HttpClient) {}

  getCityGeo(city: string): Observable<CurrentWeather> {
    const url = `${this.getCityBaseUrl}/direct?q=${city}&appid=${this.apiKey}`;
    return this.http.get<WeatherApiResponse>(url).pipe(
      map(response => this.mapCurrentWeatherResponse(response)),
      catchError(this.handleError)
    );
  }
  getCurrentWeather(city: string): Observable<CurrentWeather> {
    const unit = this.temperatureUnitSubject.value;
    const url = `${this.baseUrl}/weather?q=${city}&appid=${this.apiKey}&units=${unit}`;

    return this.http.get<WeatherApiResponse>(url).pipe(
      map(response => this.mapCurrentWeatherResponse(response)),
      catchError(this.handleError)
    );
  }

  getForecast(city: string): Observable<WeatherForecast> {
    const unit = this.temperatureUnitSubject.value;
    const url = `${this.baseUrl}/forecast?q=${city}&appid=${this.apiKey}&units=${unit}`;

    return this.http.get<ForecastApiResponse>(url).pipe(
      map(response => this.mapForecastResponse(response)),
      catchError(this.handleError)
    );
  }

  setCurrentCity(city: string): void {
    this.currentCitySubject.next(city);
  }

  getCurrentCity(): string {
    return this.currentCitySubject.value;
  }

  toggleTemperatureUnit(): void {
    const currentUnit = this.temperatureUnitSubject.value;
    const newUnit = currentUnit === 'metric' ? 'imperial' : 'metric';
    this.temperatureUnitSubject.next(newUnit);
  }

  getTemperatureUnit(): 'metric' | 'imperial' {
    return this.temperatureUnitSubject.value;
  }

  getWeatherIcon(iconCode: string): string {
    const iconMap: { [key: string]: string } = {
      '01d': '☀️', '01n': '🌙',
      '02d': '⛅', '02n': '☁️',
      '03d': '☁️', '03n': '☁️',
      '04d': '☁️', '04n': '☁️',
      '09d': '🌧️', '09n': '🌧️',
      '10d': '🌦️', '10n': '🌧️',
      '11d': '⛈️', '11n': '⛈️',
      '13d': '❄️', '13n': '❄️',
      '50d': '🌫️', '50n': '🌫️'
    };

    return iconMap[iconCode] || '🌤️';
  }

  private mapCurrentWeatherResponse(response: WeatherApiResponse): CurrentWeather {
    return {
      location: response.name,
      country: response.sys.country,
      temperature: Math.round(response.main.temp),
      description: this.capitalizeWords(response.weather[0].description),
      humidity: response.main.humidity,
      windSpeed: Math.round(response.wind.speed * 10) / 10,
      pressure: response.main.pressure,
      feelsLike: Math.round(response.main.feels_like),
      visibility: Math.round(response.visibility / 1000),
      uvIndex: 0,
      icon: response.weather[0].icon,
      timestamp: new Date(response.dt * 1000)
    };
  }

  private mapForecastResponse(response: ForecastApiResponse): WeatherForecast {
    const dailyForecasts = new Map<string, ForecastDay>();

    response.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const dateKey = date.toDateString();

      if (!dailyForecasts.has(dateKey)) {
        dailyForecasts.set(dateKey, {
          date: date,
          maxTemp: Math.round(item.main.temp_max),
          minTemp: Math.round(item.main.temp_min),
          description: this.capitalizeWords(item.weather[0].description),
          humidity: item.main.humidity,
          windSpeed: Math.round(item.wind.speed * 10) / 10,
          icon: item.weather[0].icon
        });
      } else {
        const existing = dailyForecasts.get(dateKey)!;
        existing.maxTemp = Math.max(existing.maxTemp, Math.round(item.main.temp_max));
        existing.minTemp = Math.min(existing.minTemp, Math.round(item.main.temp_min));
      }
    });

    return {
      location: response.city.name,
      country: response.city.country,
      forecast: Array.from(dailyForecasts.values()).slice(0, 5)
    };
  }

  private capitalizeWords(str: string): string {
    return str.replace(/\b\w/g, char => char.toUpperCase());
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 404:
          errorMessage = 'City not found. Please check the spelling and try again.';
          break;
        case 401:
          errorMessage = 'Invalid API key. Please check your configuration.';
          break;
        case 429:
          errorMessage = 'Too many requests. Please try again later.';
          break;
        default:
          errorMessage = `Server error: ${error.status}`;
      }
    }

    return throwError(() => new Error(errorMessage));
  }
}
