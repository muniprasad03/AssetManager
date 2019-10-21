import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from './layout';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SignalComponent } from './signal/signal.component';
import { AddSignalComponent } from './add-signal/add-signal.component';
import { AddSignalMaintaneceComponent } from './add-signal-maintanece/add-signal-maintanece.component';
import { SignalService } from './signal-service/signal-service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignalComponent,
    AddSignalComponent,
    AddSignalMaintaneceComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    LayoutModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    SignalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
