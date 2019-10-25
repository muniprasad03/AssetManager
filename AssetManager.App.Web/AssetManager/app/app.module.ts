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
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BsDatepickerModule, DatepickerModule} from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AxelListComponent } from './AxelCounter/axel-list/axel-list.component';
import { AxelService } from './AxelCounter/axel-service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignalComponent,
    AddSignalComponent,
    AddSignalMaintaneceComponent,
    AxelListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // required animations module
    HttpModule,
    AppRoutingModule,
    LayoutModule,
    ReactiveFormsModule,
    FormsModule,
    DatepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ZXingScannerModule
  ],
  providers: [
      SignalService,
      AxelService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
