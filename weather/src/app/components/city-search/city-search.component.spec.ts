import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CitySearchComponent } from './city-search.component';
import { WeatherService } from '../../services/weather.service';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('CitySearchComponent', () => {
  let component: CitySearchComponent;
  let fixture: ComponentFixture<CitySearchComponent>;
  let mockWeatherService: any;

  beforeEach(async () => {
    mockWeatherService = {
      setCurrentCity: jasmine.createSpy('setCurrentCity'),
      getCurrentCity: jasmine.createSpy('getCurrentCity').and.returnValue('Cairo')
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CitySearchComponent],
      providers: [{ provide: WeatherService, useValue: mockWeatherService }]
    }).compileComponents();

    fixture = TestBed.createComponent(CitySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with current city from service', () => {
    const cityControl = component.searchForm.get('city');
    expect(cityControl?.value).toBe('Cairo');
  });

  it('should not emit citySearch if form is invalid', () => {
    spyOn(component.citySearch, 'emit');
    component.searchForm.setValue({ city: '' }); // invalid
    component.onSubmit();
    expect(component.citySearch.emit).not.toHaveBeenCalled();
  });

  it('should emit citySearch on valid form submission', fakeAsync(() => {
    spyOn(component.citySearch, 'emit');
    spyOn(component.loadingChange, 'emit');

    component.searchForm.setValue({ city: 'London' });
    component.onSubmit();

    expect(component.isLoading).toBeTrue();
    expect(mockWeatherService.setCurrentCity).toHaveBeenCalledWith('London');
    expect(component.citySearch.emit).toHaveBeenCalledWith('London');

    tick(1000); // simulate setTimeout
    expect(component.isLoading).toBeFalse();
    expect(component.loadingChange.emit).toHaveBeenCalledTimes(2);
  }));

  it('should add recent city and save to localStorage', () => {
    spyOn(localStorage, 'setItem');
    component.recentCities = [];
    component['addToRecentCities']('Paris');
    expect(component.recentCities[0]).toBe('Paris');
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('should call searchWeather when recent city is selected', () => {
    spyOn<any>(component, 'searchWeather');
    component.selectRecentCity('Rome');
    expect(component['searchWeather']).toHaveBeenCalledWith('Rome');
  });
});
