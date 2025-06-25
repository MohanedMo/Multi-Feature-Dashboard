import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { CurrentWeatherComponent } from './app/components/current-weather/current-weather.component';
import { ForecastComponent } from './app/components/forecast/forecast.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './app/components/header/header.component';


const routes: Routes = [
  { path: '', redirectTo: '/current', pathMatch: 'full' },
  { path: 'current', component: CurrentWeatherComponent },
  { path: 'forecast', component: ForecastComponent },
  { path: '**', redirectTo: '/current' }
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  template: `
  <div class="app">
      <app-header></app-header>
      <main class="main-content">
        <div class="container">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
    `
})

export class App {}

bootstrapApplication(App, {
  providers: [
    provideRouter(routes)
  ]
});
