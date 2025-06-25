import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-current-weather',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="current-weather-page">
      <h1>Current Weather Page</h1>
    </div>
  `,
  styles: [`
    .current-weather-page {
      padding: 40px;
      text-align: center;
      font-size: 2rem;
      color: #333;
    }
  `]
})
export class CurrentWeatherComponent {}
