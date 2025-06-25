import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forecast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="forecast-page">
      <h1>Forecast Page</h1>
    </div>
  `,
  styles: [`
    .forecast-page {
      padding: 40px;
      text-align: center;
      font-size: 2rem;
      color: #333;
    }
  `]
})
export class ForecastComponent {}
