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

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'signals', component: SignalComponent },
  { path: 'signaladd', component: AddSignalComponent },
    { path: 'maintanence', component: AddSignalMaintaneceComponent },
    { path: 'axels', component: AxelListComponent },
    { path: 'axeladd', component: AddAxelComponent },
    { path: 'points', component: PointListComponent },
    { path: 'pointadd', component: AddPointComponent },
    { path: 'tracks', component: TrackListComponent },
    { path: 'trackadd', component: AddTrackComponent },
    { path: 'blocks', component: BlockListComponent },
    { path: 'blockadd', component: AddBlockComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
