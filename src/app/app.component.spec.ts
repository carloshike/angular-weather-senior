import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, async, ComponentFixture, tick, fakeAsync} from '@angular/core/testing';
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

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
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
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});