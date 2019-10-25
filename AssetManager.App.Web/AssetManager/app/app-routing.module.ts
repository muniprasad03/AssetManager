import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignalComponent } from './signal/signal.component';
import { AddSignalComponent } from './add-signal/add-signal.component';
import { AddSignalMaintaneceComponent } from './add-signal-maintanece/add-signal-maintanece.component';
import { AxelListComponent } from './AxelCounter/axel-list/axel-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'signals', component: SignalComponent },
  { path: 'signaladd', component: AddSignalComponent },
    { path: 'maintanence', component: AddSignalMaintaneceComponent },
    { path: 'axels', component: AxelListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
