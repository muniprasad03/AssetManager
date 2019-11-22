import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignalComponent } from './signal/signal.component';
import { AddSignalComponent } from './add-signal/add-signal.component';
import { AddSignalMaintaneceComponent } from './add-signal-maintanece/add-signal-maintanece.component';
import { AxelListComponent } from './AxelCounter/axel-list/axel-list.component';
import { AddAxelComponent } from './AxelCounter/add-axel/add-axel.component';
import { PointListComponent } from '../app/point/point-list/point-list.component';
import { AddPointComponent } from '../app/point/add-point/add-point.component';
import { TrackListComponent } from '../app/Track Circuits/track-list/track-list.component';
import { AddTrackComponent } from './Track Circuits/add-track/add-track.component';
import { BlockListComponent } from './Block/block-list/block-list.component';
import { AddBlockComponent } from './Block/add-block/add-block.component';
import { SignalMaintanenceListComponent } from './signal-maintanence-list/signal-maintanence-list.component';
import { AddAxelMaintaneceComponent } from './add-axel-maintanece/add-axel-maintanece.component';
import { AxelMaintaneceListComponent } from './axel-maintanece-list/axel-maintanece-list.component';
import { AddBlockMaintaneceComponent } from './add-block-maintanece/add-block-maintanece.component';
import { BlockMaintaneceListComponent } from './block-maintanece-list/block-maintanece-list.component';
import { AddPointMaintaneceComponent } from './add-point-maintanece/add-point-maintanece.component';
import { PointMaintaneceListComponent } from './point-maintanece-list/point-maintanece-list.component';
import { AddTrackCircuitMaintaneceComponent } from './add-track-circuit-maintanece/add-track-circuit-maintanece.component';
import { TrackCircuitMaintaneceListComponent } from './track-circuit-maintanece-list/track-circuit-maintanece-list.component';
import { MaintanenceComponent } from './Maintanence/maintanence/maintanence.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'signals', component: SignalComponent },
  { path: 'signaladd', component: AddSignalComponent },
  { path: 'editsignal/:id', component: AddSignalComponent },
  { path: 'signalmaintanence/:id', component: AddSignalMaintaneceComponent },
  { path: 'signal/:id/view/:mid', component: AddSignalMaintaneceComponent },
  { path: 'signalmaintanencelist/:id', component: SignalMaintanenceListComponent },
  { path: 'axels', component: AxelListComponent },
  { path: 'axeladd', component: AddAxelComponent },
  { path: 'editaxel/:id', component: AddAxelComponent },
  { path: 'points', component: PointListComponent },
  { path: 'pointadd', component: AddPointComponent },
  { path: 'editpoint/:id', component: AddPointComponent },
  { path: 'tracks', component: TrackListComponent },
  { path: 'trackadd', component: AddTrackComponent },
  { path: 'edittrack/:id', component: AddTrackComponent },
  { path: 'blocks', component: BlockListComponent },
  { path: 'blockadd', component: AddBlockComponent },
  { path: 'editblock/:id', component: AddBlockComponent },
  { path: 'axelmaintanence/:id', component: AddAxelMaintaneceComponent },
  { path: 'axelmaintanecelist/:id', component: AxelMaintaneceListComponent },
  { path: 'pointmaintanece/:id', component: AddPointMaintaneceComponent },
  { path: 'pointmaintanecelist/:id', component: PointMaintaneceListComponent },
  { path: 'blockmaintanece/:id', component: AddBlockMaintaneceComponent },
  { path: 'blockmaintanecelist/:id', component: BlockMaintaneceListComponent },
  { path: 'trackcircuitmaintanece/:id', component: AddTrackCircuitMaintaneceComponent },
  { path: 'trackcircuitmaintanecelist/:id', component: TrackCircuitMaintaneceListComponent },
  { path: 'maintanence', component: MaintanenceComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
