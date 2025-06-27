import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrentWeatherComponent } from './current-weather.component';
import { WeatherService } from '../../services/weather.service';
import { of, throwError, BehaviorSubject } from 'rxjs';
import { CurrentWeather } from '../../models/weather.model';

describe('CurrentWeatherComponent', () => {
  let component: CurrentWeatherComponent;
  let fixture: ComponentFixture<CurrentWeatherComponent>;
  let mockWeatherService: any;

  const dummyWeather: CurrentWeather = {
    location: 'London',
    country: 'GB',
    temperature: 22,
    description: 'Clear sky',
    humidity: 50,
    windSpeed: 3.2,
    pressure: 1015,
    feelsLike: 21,
    visibility: 10,
    uvIndex: 0,
    icon: '01d',
    timestamp: new Date()
  };

  beforeEach(async () => {
    mockWeatherService = {
      getCurrentWeather: jasmine.createSpy(),
      getWeatherIcon: jasmine.createSpy().and.returnValue('☀️'),
      getCurrentCity: jasmine.createSpy().and.returnValue('London'),
      temperatureUnit$: new BehaviorSubject<'metric' | 'imperial'>('metric')
    };

    await TestBed.configureTestingModule({
      imports: [CurrentWeatherComponent],
      providers: [{ provide: WeatherService, useValue: mockWeatherService }]
    }).compileComponents();

    fixture = TestBed.createComponent(CurrentWeatherComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    mockWeatherService.getCurrentWeather.and.returnValue(of(dummyWeather));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load weather data on init', () => {
    mockWeatherService.getCurrentWeather.and.returnValue(of(dummyWeather));
    fixture.detectChanges();
    expect(component.weather).toEqual(dummyWeather);
    expect(component.isLoading).toBeFalse();
  });

  it('should reload weather when temperature unit changes', () => {
    mockWeatherService.getCurrentWeather.and.returnValue(of(dummyWeather));
    fixture.detectChanges();

    mockWeatherService.getCurrentWeather.calls.reset();
    mockWeatherService.temperatureUnit$.next('imperial');

    expect(mockWeatherService.getCurrentWeather).toHaveBeenCalledWith('London');
  });

  it('should set error message if weather API fails', () => {
    mockWeatherService.getCurrentWeather.and.returnValue(
      throwError(() => new Error('City not found'))
    );
    fixture.detectChanges();
    expect(component.weather).toBeNull();
    expect(component.error).toBe('City not found');
    expect(component.isLoading).toBeFalse();
  });

  it('should call loadWeather when searchCity is called', () => {
    mockWeatherService.getCurrentWeather.and.returnValue(of(dummyWeather));
    component.searchCity('Cairo');
    expect(mockWeatherService.getCurrentWeather).toHaveBeenCalledWith('Cairo');
  });

  it('should get weather icon from service', () => {
    const icon = component.getWeatherIcon('01d');
    expect(icon).toBe('☀️');
    expect(mockWeatherService.getWeatherIcon).toHaveBeenCalledWith('01d');
  });

  it('should format date correctly', () => {
    const formatted = component.formatDate(new Date('2024-05-01T12:00:00Z'));
    expect(formatted).toContain('Wednesday');
  });
});
