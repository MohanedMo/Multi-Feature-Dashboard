import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForecastComponent } from './forecast.component';
import { WeatherService } from '../../services/weather.service';
import { of, throwError, BehaviorSubject } from 'rxjs';
import { WeatherForecast } from '../../models/weather.model';

describe('ForecastComponent', () => {
  let component: ForecastComponent;
  let fixture: ComponentFixture<ForecastComponent>;
  let mockWeatherService: any;

  const dummyForecast: WeatherForecast = {
    location: 'London',
    country: 'GB',
    forecast: [
      {
        date: new Date('2025-06-27'),
        maxTemp: 28,
        minTemp: 18,
        description: 'Sunny',
        humidity: 40,
        windSpeed: 3.5,
        icon: '01d'
      },
      {
        date: new Date('2025-06-28'),
        maxTemp: 25,
        minTemp: 17,
        description: 'Cloudy',
        humidity: 50,
        windSpeed: 4.0,
        icon: '02d'
      }
    ]
  };

  beforeEach(async () => {
    mockWeatherService = {
      getForecast: jasmine.createSpy(),
      getWeatherIcon: jasmine.createSpy().and.returnValue('🌤️'),
      getCurrentCity: jasmine.createSpy().and.returnValue('London'),
      temperatureUnit$: new BehaviorSubject<'metric' | 'imperial'>('metric')
    };

    await TestBed.configureTestingModule({
      imports: [ForecastComponent],
      providers: [{ provide: WeatherService, useValue: mockWeatherService }]
    }).compileComponents();

    fixture = TestBed.createComponent(ForecastComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    mockWeatherService.getForecast.and.returnValue(of(dummyForecast));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load forecast on init', () => {
    mockWeatherService.getForecast.and.returnValue(of(dummyForecast));
    fixture.detectChanges();

    expect(component.forecast).toEqual(dummyForecast);
    expect(component.isLoading).toBeFalse();
  });

  it('should reload forecast on temperature unit change', () => {
    mockWeatherService.getForecast.and.returnValue(of(dummyForecast));
    fixture.detectChanges(); // initial load

    mockWeatherService.getForecast.calls.reset(); // reset call count

    mockWeatherService.temperatureUnit$.next('imperial'); // simulate unit change
    expect(mockWeatherService.getForecast).toHaveBeenCalledWith('London');
  });

  it('should show error when forecast API fails', () => {
    mockWeatherService.getForecast.and.returnValue(
      throwError(() => new Error('API Error'))
    );

    fixture.detectChanges();
    expect(component.forecast).toBeNull();
    expect(component.error).toBe('API Error');
    expect(component.isLoading).toBeFalse();
  });

  it('should call loadForecast on searchCity()', () => {
    mockWeatherService.getForecast.and.returnValue(of(dummyForecast));
    component.searchCity('Paris');
    expect(mockWeatherService.getForecast).toHaveBeenCalledWith('Paris');
  });

  it('should get weather icon from service', () => {
    const icon = component.getWeatherIcon('01d');
    expect(icon).toBe('🌤️');
    expect(mockWeatherService.getWeatherIcon).toHaveBeenCalledWith('01d');
  });

  it('should format date and day correctly', () => {
    const date = new Date('2025-06-29');
    expect(component.formatDayName(date, 0)).toBe('Today');
    expect(component.formatDayName(date, 1)).toBe('Tomorrow');
    expect(component.formatDayName(date, 2)).toMatch(/^[A-Z][a-z]+$/); // like "Sunday"

    expect(component.formatDate(date)).toMatch(/^[A-Z][a-z]{2} \d{1,2}$/); // like "Jun 29"
  });
});
