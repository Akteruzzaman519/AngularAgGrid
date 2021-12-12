import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AdnanComponent } from './adnan/adnan.component';
import { RituComponent } from './ritu/ritu.component';
import { NaimComponent } from './naim/naim.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AkterComponent } from './akter/akter.component';
import { SonetComponent } from './sonet/sonet.component';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AdnanComponent,
    RituComponent,
    NaimComponent,
    AkterComponent,
    SonetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    AgGridModule.withComponents([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
