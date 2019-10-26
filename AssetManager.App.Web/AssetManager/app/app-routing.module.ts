import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignalComponent } from './signal/signal.component';
import { AddSignalComponent } from './add-signal/add-signal.component';
import { AddSignalMaintaneceComponent } from './add-signal-maintanece/add-signal-maintanece.component';
import { AxelListComponent } from './AxelCounter/axel-list/axel-list.component';
import { AddAxelComponent } from './AxelCounter/add-axel/add-axel.component';
import { PointListComponent } from '../app/point/point-list/point-list.component';
import { AddPointComponent } from '../app/point/add-point/add-point.component'

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
