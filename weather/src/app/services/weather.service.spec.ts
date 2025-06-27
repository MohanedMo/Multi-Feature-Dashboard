import { TestBed } from '@angular/core/testing';
import { WeatherService } from './weather.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CurrentWeather, WeatherForecast } from '../models/weather.model';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  const dummyWeatherResponse = {
    name: 'London',
    sys: { country: 'GB' },
    main: {
      temp: 20,
      humidity: 50,
      pressure: 1012,
      feels_like: 18
    },
    weather: [{ description: 'clear sky', icon: '01d' }],
    wind: { speed: 5 },
    visibility: 10000,
    dt: 1623312000
  };

  const dummyForecastResponse = {
    city: { name: 'London', country: 'GB' },
    list: [
      {
        dt: 1623312000,
        main: { temp_max: 21, temp_min: 15, humidity: 55 },
        weather: [{ description: 'light rain', icon: '10d' }],
        wind: { speed: 3 }
      },
      {
        dt: 1623398400,
        main: { temp_max: 25, temp_min: 17, humidity: 60 },
        weather: [{ description: 'few clouds', icon: '02d' }],
        wind: { speed: 4 }
      }
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService]
    });

    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch current weather', () => {
    service.getCurrentWeather('London').subscribe((weather: CurrentWeather) => {
      expect(weather.location).toBe('London');
      expect(weather.country).toBe('GB');
      expect(weather.temperature).toBe(Math.round(dummyWeatherResponse.main.temp));
    });

    const req = httpMock.expectOne((request) =>
      request.url.includes('/weather') && request.url.includes('London')
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummyWeatherResponse);
  });

  it('should fetch weather forecast', () => {
    service.getForecast('London').subscribe((forecast: WeatherForecast) => {
      expect(forecast.location).toBe('London');
      expect(forecast.country).toBe('GB');
      expect(forecast.forecast.length).toBeGreaterThan(0);
    });

    const req = httpMock.expectOne((request) =>
      request.url.includes('/forecast') && request.url.includes('London')
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummyForecastResponse);
  });

  it('should handle 404 error', () => {
    service.getCurrentWeather('UnknownCity').subscribe({
      next: () => fail('Should have thrown error'),
      error: (err) => {
        expect(err.message).toContain('City not found');
      }
    });

    const req = httpMock.expectOne((request) =>
      request.url.includes('/weather') && request.url.includes('UnknownCity')
    );
    req.flush({}, { status: 404, statusText: 'Not Found' });
  });
});
