import { TestBed, async, ComponentFixture, tick, fakeAsync} from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { By } from '@angular/platform-browser';

import { WeatherService } from './services/weather.service';
import { AddressService } from './services/address.service';
import { PlaceService } from './services/place.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule, MatInputModule, MatProgressSpinnerModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CookieService } from 'ngx-cookie-service';
import { DatePipe } from '@angular/common';
import 'hammerjs';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser'
import { MyGestureConfig } from './config/my-gesture-config';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatSelectModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTabsModule,
        MatIconModule,
        MatTooltipModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        WeatherService,
        AddressService,
        CookieService,
        PlaceService,
        DatePipe,
        {
          provide: HAMMER_GESTURE_CONFIG,
          useClass: MyGestureConfig
        }       
      ]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;   
  }));

  it('Deve criar', () => {
    expect(component).toBeDefined();
  });

  // describe('Verifica conteúdo exibido no HTML', fakeAsync(() => {
  //   it('Deve ter dois inputs de endereço', () => {
      
  //     fixture.detectChanges();
  //     const inputRegion = fixture.debugElement.queryAll(By.css('.input-form'));

  //     expect(inputRegion.length).toEqual(2);
  //   });
  // }));  

  // describe('Verifica conteúdo exibido no HTML', () => {
  //   it('Deve ter dois inputs default para o endereço', () => {
  //     fixture.detectChanges();
  //     const inputRegion = fixture.debugElement.query(By.css('.input-form'))[0].nativeElement;
  //     const inputCity = fixture.debugElement.query(By.css('.input-form'))[1].nativeElement;

  //     expect(inputRegion.innerText).toContain('Santa Catarina');
  //     expect(inputRegion.inputCity).toContain('Blumenau');
  //   });
  // });  

  // it('should create the app', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app).toBeTruthy();
  // });

  // it(`should have as title 'angular-weather-senior'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('angular-weather-senior');
  // });

  // it('should render title in a h1 tag', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to angular-weather-senior!');
  // });
});
