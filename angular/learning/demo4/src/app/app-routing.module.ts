import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoPipeComponent } from './components/demo-pipe/demo-pipe.component';
import { DemoListComponent } from './components/demo-list/demo-list.component';


const routes: Routes = [
  {path: 'demo-pipe', component: DemoPipeComponent},
  {path: 'demo', component: DemoListComponent},
  { path: '', redirectTo: 'demo', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
