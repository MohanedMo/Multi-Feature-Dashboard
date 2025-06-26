import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../services/weather.service';
import { CitySearchComponent } from '../city-search/city-search.component';
import { WeatherForecast, ForecastDay } from '../../models/weather.model';

@Component({
  selector: 'app-forecast',
  standalone: true,
  imports: [CommonModule, CitySearchComponent],
  template: `
    <div class="forecast">
      <app-city-search
        (citySearch)="searchCity($event)"
        (loadingChange)="onLoadingChange($event)"
      ></app-city-search>

      <div *ngIf="isLoading" class="loading">
        <div class="spinner"></div>
        <p>Loading forecast data...</p>
      </div>

      <div *ngIf="error" class="error fade-in">
        {{ error }}
      </div>

      <div *ngIf="forecast && !isLoading" class="forecast-content fade-in">
        <div class="forecast-header card">
          <h2 class="forecast-title">
            5-Day Weather Forecast for {{ forecast.location }}, {{ forecast.country }}
          </h2>
          <p class="forecast-subtitle">Plan your week ahead</p>
        </div>

        <div class="forecast-grid grid grid-3">
          <div
            *ngFor="let day of forecast.forecast; let i = index"
            class="forecast-card card"
            [class.today]="i === 0"
          >
            <div class="forecast-header-day">
              <h3 class="day-name">{{ formatDayName(day.date, i) }}</h3>
              <p class="day-date">{{ formatDate(day.date) }}</p>
            </div>

            <div class="forecast-weather">
              <div class="forecast-icon">{{ getWeatherIcon(day.icon) }}</div>
              <div class="forecast-temps">
                <span class="temp-max">{{ day.maxTemp }}°</span>
                <span class="temp-separator">/</span>
                <span class="temp-min">{{ day.minTemp }}°</span>
                <span class="temp-unit">{{ temperatureUnit === 'metric' ? 'C' : 'F' }}</span>
              </div>
              <p class="forecast-description">{{ day.description }}</p>
            </div>

            <div class="forecast-details">
              <div class="detail-row">
                <span class="detail-label">💧 Humidity:</span>
                <span class="detail-value">{{ day.humidity }}%</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">💨 Wind:</span>
                <span class="detail-value">
                  {{ day.windSpeed }} {{ temperatureUnit === 'metric' ? 'm/s' : 'mph' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .forecast {
      min-height: 400px;
    }

    .forecast-header {
      padding: 30px;
      text-align: center;
      margin-bottom: 30px;
    }

    .forecast-title {
      font-size: 1.8rem;
      font-weight: 600;
      color: #333;
      margin-bottom: 10px;
    }

    .forecast-subtitle {
      color: #666;
      font-size: 1.1rem;
    }

    .forecast-grid {
      gap: 20px;
    }

    .forecast-card {
      padding: 25px;
      text-align: center;
      transition: all 0.3s ease;
      border: 2px solid transparent;
    }

    .forecast-card.today {
      border-color: #667eea;
      background: #04044f ;
    }

    .forecast-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    }

    .forecast-header-day {
      margin-bottom: 20px;
    }

    .day-name {
      font-size: 1.3rem;
      font-weight: 600;
      color: #333;
      margin-bottom: 5px;
    }

    .forecast-card.today .day-name {
      color: #fff;
    }

    .forecast-card.today .day-date {
      color: #fff;
      font-size: 0.9rem;
    }

    .forecast-weather {
      margin-bottom: 20px;
    }

    .forecast-icon {
      font-size: 3rem;
      margin-bottom: 15px;
    }

    .forecast-temps {
      margin-bottom: 10px;
      display: flex;
      align-items: baseline;
      justify-content: center;
      gap: 4px;
      flex-wrap: wrap;
    }

    .forecast-card.today .temp-max {
      font-size: 1.8rem;
      font-weight: 700;
      color: #fff;
    }

    .temp-separator {
      font-size: 1.4rem;
      color: #999;
      margin: 0 2px;
    }

    .temp-min {
      font-size: 1.4rem;
      font-weight: 500;
      color: #666;
    }

    .temp-unit {
      font-size: 1.2rem;
      color: #888;
    }

    .forecast-card.today .forecast-description {
      color: #fff;
      font-size: 1rem;
      font-weight: 500;
    }

    .forecast-details {
      border-top: 1px solid #eee;
      padding-top: 15px;
    }

      .detail-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
      font-size: 0.9rem;
    }

    .detail-row:last-child {
      margin-bottom: 0;
    }

    .forecast-card.today .detail-label {
      color: #fff;
    }

    .forecast-card.today .detail-value {
      font-weight: 600;
      color: #fff;
    }

    @media (max-width: 1024px) {
      .forecast-grid {
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      }
    }

    @media (max-width: 768px) {
      .forecast-header {
        padding: 20px;
      }

      .forecast-title {
        font-size: 1.5rem;
      }

      .forecast-card {
        padding: 20px;
      }

      .forecast-grid {
        grid-template-columns: 1fr;
        gap: 15px;
      }

      .forecast-icon {
        font-size: 2.5rem;
      }

      .temp-max {
        font-size: 1.6rem;
      }

      .temp-min {
        font-size: 1.3rem;
      }
    }
  `]
})
export class ForecastComponent implements OnInit {
  forecast: WeatherForecast | null = null;
  isLoading = false;
  error: string | null = null;
  temperatureUnit: 'metric' | 'imperial' = 'metric';

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.weatherService.temperatureUnit$.subscribe(unit => {
      this.temperatureUnit = unit;
      if (this.forecast) {
        this.loadForecast(this.weatherService.getCurrentCity());
      }
    });

    this.loadForecast(this.weatherService.getCurrentCity());
  }

  searchCity(city: string) {
    this.loadForecast(city);
  }

  onLoadingChange(loading: boolean) {
    // Handle loading state from search component if needed
  }

  private loadForecast(city: string) {
    this.isLoading = true;
    this.error = null;

    this.weatherService.getForecast(city).subscribe({
      next: (forecast) => {
        this.forecast = forecast;
        this.isLoading = false;
      },
      error: (error) => {
        this.error = error.message;
        this.forecast = null;
        this.isLoading = false;
      }
    });
  }

  getWeatherIcon(iconCode: string): string {
    return this.weatherService.getWeatherIcon(iconCode);
  }

  formatDayName(date: Date, index: number): string {
    if (index === 0) {
      return 'Today';
    } else if (index === 1) {
      return 'Tomorrow';
    }

    return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric'
    }).format(date);
  }
}
