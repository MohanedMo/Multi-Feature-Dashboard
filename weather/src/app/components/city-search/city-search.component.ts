import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-city-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="search-container card fade-in">
      <h2 class="search-title">🔍 Search Weather</h2>
      
      <form [formGroup]="searchForm" (ngSubmit)="onSubmit()" class="search-form">
        <div class="form-group">
          <label for="city" class="form-label">Enter City Name</label>
          <input
            id="city"
            type="text"
            formControlName="city"
            class="form-input"
            placeholder="e.g., London, New York, Tokyo"
            [class.error-input]="isFormSubmitted && searchForm.get('city')?.invalid"
          />
          <div 
            *ngIf="isFormSubmitted && searchForm.get('city')?.invalid" 
            class="error-message"
          >
            Please enter a valid city name (at least 2 characters)
          </div>
        </div>
        
        <button 
          type="submit" 
          class="btn btn-primary search-btn"
          [disabled]="isLoading"
        >
          <span *ngIf="!isLoading">🌍 Get Weather</span>
          <span *ngIf="isLoading" class="loading-text">
            <span class="spinner-small"></span> Searching...
          </span>
        </button>
      </form>
      
      <div class="recent-cities" *ngIf="recentCities.length > 0">
        <h3 class="recent-title">Recent Searches</h3>
        <div class="recent-buttons">
          <button
            *ngFor="let city of recentCities"
            (click)="selectRecentCity(city)"
            class="btn btn-secondary recent-btn"
          >
            {{ city }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .search-container {
      padding: 30px;
      margin-bottom: 30px;
    }

    .search-title {
      font-size: 1.8rem;
      font-weight: 600;
      margin-bottom: 25px;
      text-align: center;
      color: #333;
    }

    .search-form {
      max-width: 500px;
      margin: 0 auto;
    }

    .search-btn {
      width: 100%;
      font-size: 16px;
      padding: 16px;
    }

    .error-input {
      border-color: #ff6b6b !important;
      background: rgba(255, 107, 107, 0.05) !important;
    }

    .error-message {
      color: #ff6b6b;
      font-size: 14px;
      margin-top: 8px;
      padding-left: 4px;
    }

    .loading-text {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .spinner-small {
      width: 16px;
      height: 16px;
      border: 2px solid transparent;
      border-top: 2px solid currentColor;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    .recent-cities {
      margin-top: 30px;
      text-align: center;
    }

    .recent-title {
      font-size: 1.2rem;
      font-weight: 500;
      margin-bottom: 15px;
      color: #666;
    }

    .recent-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      justify-content: center;
    }

    .recent-btn {
      font-size: 14px;
      padding: 8px 16px;
    }

    @media (max-width: 768px) {
      .search-container {
        padding: 20px;
      }

      .recent-buttons {
        gap: 8px;
      }
    }
  `]
})
export class CitySearchComponent implements OnInit {
  @Output() citySearch = new EventEmitter<string>();
  @Output() loadingChange = new EventEmitter<boolean>();

  searchForm: FormGroup;
  isFormSubmitted = false;
  isLoading = false;
  recentCities: string[] = [];

  constructor(
    private fb: FormBuilder,
    private weatherService: WeatherService
  ) {
    this.searchForm = this.fb.group({
      city: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Z\s,.-]+$/)]]
    });
  }

  ngOnInit() {
    this.loadRecentCities();
    
    // Set current city in form
    const currentCity = this.weatherService.getCurrentCity();
    this.searchForm.patchValue({ city: currentCity });
  }

  onSubmit() {
    this.isFormSubmitted = true;
    
    if (this.searchForm.valid) {
      const city = this.searchForm.get('city')?.value.trim();
      this.searchWeather(city);
    }
  }

  selectRecentCity(city: string) {
    this.searchForm.patchValue({ city });
    this.searchWeather(city);
  }

  private searchWeather(city: string) {
    this.isLoading = true;
    this.loadingChange.emit(true);
    
    this.weatherService.setCurrentCity(city);
    this.addToRecentCities(city);
    this.citySearch.emit(city);
    
    // Reset loading state after a short delay
    setTimeout(() => {
      this.isLoading = false;
      this.loadingChange.emit(false);
    }, 1000);
  }

  private addToRecentCities(city: string) {
    const cityName = city.trim();
    this.recentCities = this.recentCities.filter(c => 
      c.toLowerCase() !== cityName.toLowerCase()
    );
    this.recentCities.unshift(cityName);
    this.recentCities = this.recentCities.slice(0, 5);
    this.saveRecentCities();
  }

  private loadRecentCities() {
    const saved = localStorage.getItem('weather-recent-cities');
    if (saved) {
      this.recentCities = JSON.parse(saved);
    }
  }

  private saveRecentCities() {
    localStorage.setItem('weather-recent-cities', JSON.stringify(this.recentCities));
  }
}