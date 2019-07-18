import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { WeatherService } from './services/weather.service';
import { AddressService } from './services/address.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule, MatInputModule, MatProgressSpinnerModule} from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import { CookieService } from 'ngx-cookie-service';
import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent
  ],
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
    MatIconModule
  ],
  providers: [
    WeatherService,
    AddressService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
