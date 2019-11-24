import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
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
import { AddAxelComponent } from './AxelCounter/add-axel/add-axel.component';
import { PointListComponent } from './point/point-list/point-list.component';
import { AddPointComponent } from './point/add-point/add-point.component';
import { TrackListComponent } from './Track Circuits/track-list/track-list.component';
import { AddTrackComponent } from './Track Circuits/add-track/add-track.component';
import { SignalMaintanenceListComponent } from './signal-maintanence-list/signal-maintanence-list.component';
import { AccordionModule } from 'ngx-bootstrap';
import { PointService } from './point/point-service';
import { BlockListComponent } from './Block/block-list/block-list.component';
import { AddBlockComponent } from './Block/add-block/add-block.component';
import { BlockService } from './Block/block-service';
import { TrackService } from './Track Circuits/track-service';
import { SignalMaintanenceService } from './signal-service/signal-maintenance-service';
import { StationService } from './station-Service/station-service';
import { BlockMaintaneceListComponent } from './block-maintanece-list/block-maintanece-list.component';
import { AxelMaintaneceListComponent } from './axel-maintanece-list/axel-maintanece-list.component';
import { PointMaintaneceListComponent } from './point-maintanece-list/point-maintanece-list.component';
import { TrackCircuitMaintaneceListComponent } from './track-circuit-maintanece-list/track-circuit-maintanece-list.component';
import { AddBlockMaintaneceComponent } from './add-block-maintanece/add-block-maintanece.component';
import { AddTrackCircuitMaintaneceComponent } from './add-track-circuit-maintanece/add-track-circuit-maintanece.component';
import { AddAxelMaintaneceComponent } from './add-axel-maintanece/add-axel-maintanece.component';
import { AddPointMaintaneceComponent } from './add-point-maintanece/add-point-maintanece.component';
import { MaintanenceComponent } from './Maintanence/maintanence/maintanence.component';
import { AxelMaintanenceService } from './AxelCounter/axel-maintenance-service';
import { TrackMaintanenceService } from './Track Circuits/track-service-maintenace'



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignalComponent,
    AddSignalComponent,
    AddSignalMaintaneceComponent,
    AxelListComponent,
    AddAxelComponent,
    PointListComponent,
    AddPointComponent,
    TrackListComponent,
    SignalMaintanenceListComponent,
    AddTrackComponent,
    BlockListComponent,
    AddBlockComponent,
    BlockMaintaneceListComponent,
    AxelMaintaneceListComponent,
    PointMaintaneceListComponent,
    TrackCircuitMaintaneceListComponent,
    AddBlockMaintaneceComponent,
    AddTrackCircuitMaintaneceComponent,
    AddAxelMaintaneceComponent,
    AddPointMaintaneceComponent,
    MaintanenceComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // required animations module
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    LayoutModule,
    ReactiveFormsModule,
    FormsModule,
    DatepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    AccordionModule.forRoot(),
    ZXingScannerModule
  ],
  providers: [
    SignalService,
    AxelService,
    PointService,
    BlockService,
    TrackService,
    SignalMaintanenceService,
    AxelMaintanenceService,
      StationService,
      TrackMaintanenceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
