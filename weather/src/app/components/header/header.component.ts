import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="header">
      <div class="container">
        <div class="header-content">
          <h1 class="logo">🌤️ Weather Dashboard</h1>

          <nav class="nav">
            <a routerLink="/current" routerLinkActive="active" class="nav-link">
              📊 Current Weather
            </a>
            <a routerLink="/forecast" routerLinkActive="active" class="nav-link">
              📅 5-Day Forecast
            </a>
          </nav>

          <div class="header-actions">
            <button class="btn btn-secondary" (click)="toggleUnit()">
              {{ temperatureUnit !== 'metric' ? '°F' : '°C' }}
            </button>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      padding: 20px 0;
      margin-bottom: 30px;
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 20px;
    }

    .logo {
      font-size: 1.8rem;
      font-weight: 700;
      color: #333;
      margin: 0;
    }

    .nav {
      display: flex;
      gap: 20px;
    }

    .nav-link {
      text-decoration: none;
      color: #666;
      font-weight: 500;
      padding: 10px 16px;
      border-radius: 8px;
      transition: all 0.3s ease;
    }

    .nav-link:hover {
      color: #667eea;
      background: rgba(102, 126, 234, 0.1);
    }

    .nav-link.active {
      color: #667eea;
      background: rgba(102, 126, 234, 0.15);
    }

    .header-actions {
      display: flex;
      gap: 12px;
      align-items: center;
    }

    @media (max-width: 768px) {
      .header-content {
        flex-direction: column;
        text-align: center;
      }

      .nav {
        order: 3;
        width: 100%;
        justify-content: center;
      }

      .header-actions {
        order: 2;
      }
    }
  `]
})
export class HeaderComponent implements OnInit {
  temperatureUnit: 'metric' | 'imperial' = 'metric';

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.weatherService.temperatureUnit$.subscribe(unit => {
      this.temperatureUnit = unit;
    });
  }

  toggleUnit() {
    this.weatherService.toggleTemperatureUnit();
  }
}
