import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../services/weather.service';
import { CitySearchComponent } from '../city-search/city-search.component';
import { CurrentWeather } from '../../models/weather.model';

@Component({
  selector: 'app-current-weather',
  standalone: true,
  imports: [CommonModule, CitySearchComponent],
  template: `
    <div class="current-weather">
      <app-city-search
        (citySearch)="searchCity($event)"
      ></app-city-search>

      <div *ngIf="isLoading" class="loading">
        <div class="spinner"></div>
        <p>Loading weather data...</p>
      </div>

      <div *ngIf="error" class="error fade-in">
        {{ error }}
      </div>

      <div *ngIf="weather && !isLoading" class="weather-content fade-in">
        <div class="main-weather card">
          <div class="weather-header">
            <h2 class="location">{{ weather.location }}, {{ weather.country }}</h2>
            <p class="timestamp">{{ formatDate(weather.timestamp) }}</p>
          </div>

          <div class="weather-main">
            <div class="weather-icon">{{ getWeatherIcon(weather.icon) }}</div>
            <div class="temperature">
              <span class="temp-large">{{ weather.temperature }}°</span>
              <span class="unit">{{ temperatureUnit === 'metric' ? 'C' : 'F' }}</span>
            </div>
            <p class="description">{{ weather.description }}</p>
            <p class="feels-like">
              Feels like {{ weather.feelsLike }}°{{ temperatureUnit === 'metric' ? 'C' : 'F' }}
            </p>
          </div>
        </div>

        <div class="weather-details grid grid-2">
          <div class="detail-card card">
            <div class="detail-icon">💧</div>
            <div class="detail-content">
              <h3 class="detail-title">Humidity</h3>
              <p class="detail-value">{{ weather.humidity }}%</p>
            </div>
          </div>

          <div class="detail-card card">
            <div class="detail-icon">💨</div>
            <div class="detail-content">
              <h3 class="detail-title">Wind Speed</h3>
              <p class="detail-value">
                {{ weather.windSpeed }} {{ temperatureUnit === 'metric' ? 'm/s' : 'mph' }}
              </p>
            </div>
          </div>

          <div class="detail-card card">
            <div class="detail-icon">🌡️</div>
            <div class="detail-content">
              <h3 class="detail-title">Pressure</h3>
              <p class="detail-value">{{ weather.pressure }} hPa</p>
            </div>
          </div>

          <div class="detail-card card">
            <div class="detail-icon">👁️</div>
            <div class="detail-content">
              <h3 class="detail-title">Visibility</h3>
              <p class="detail-value">{{ weather.visibility }} km</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .current-weather {
      min-height: 400px;
    }

    .main-weather {
      padding: 40px;
      text-align: center;
      margin-bottom: 30px;
    }

    .weather-header {
      margin-bottom: 30px;
    }

    .location {
      font-size: 2rem;
      font-weight: 600;
      color: #333;
      margin-bottom: 8px;
    }

    .timestamp {
      color: #666;
      font-size: 1rem;
    }

    .weather-main {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 15px;
    }

    .temperature {
      display: flex;
      align-items: baseline;
      gap: 4px;
    }

    .unit {
      font-size: 2rem;
      font-weight: 400;
      color: #666;
    }

    .description {
      font-size: 1.3rem;
      color: #666;
      font-weight: 500;
      text-transform: capitalize;
    }

    .feels-like {
      color: #888;
      font-size: 1.1rem;
    }

    .weather-details {
      margin-top: 30px;
    }

    .detail-card {
      display: flex;
      align-items: center;
      padding: 25px;
      gap: 20px;
    }

    .detail-icon {
      font-size: 2.5rem;
      flex-shrink: 0;
    }

    .detail-content {
      flex: 1;
    }

    .detail-title {
      font-size: 1rem;
      color: #666;
      margin-bottom: 5px;
      font-weight: 500;
    }

    .detail-value {
      font-size: 1.4rem;
      font-weight: 600;
      color: #333;
    }

    @media (max-width: 768px) {
      .main-weather {
        padding: 25px;
      }

      .location {
        font-size: 1.6rem;
      }

      .detail-card {
        padding: 20px;
        gap: 15px;
      }

      .detail-icon {
        font-size: 2rem;
      }

      .detail-value {
        font-size: 1.2rem;
      }
    }
  `]
})
export class CurrentWeatherComponent implements OnInit {
  weather: CurrentWeather | null = null;
  isLoading = false;
  error: string | null = null;
  temperatureUnit: 'metric' | 'imperial' = 'metric';

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.weatherService.temperatureUnit$.subscribe(unit => {
      this.temperatureUnit = unit;
      if (this.weather) {
        this.loadWeather(this.weatherService.getCurrentCity());
      }
    });

    this.loadWeather(this.weatherService.getCurrentCity());
  }

  searchCity(city: string) {
    this.loadWeather(city);
  }


  private loadWeather(city: string) {
    this.isLoading = true;
    this.error = null;
    this.weatherService.getCurrentWeather(city).subscribe({
      next: (weather) => {
        this.weather = weather;
        this.isLoading = false;
      },
      error: (error) => {
        this.error = error.message;
        this.weather = null;
        this.isLoading = false;
      }
    });
  }

  getWeatherIcon(iconCode: string): string {
    return this.weatherService.getWeatherIcon(iconCode);
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    }).format(date);
  }
}
