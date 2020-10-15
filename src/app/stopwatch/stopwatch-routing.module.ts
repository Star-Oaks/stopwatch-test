import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StopwatchContainerComponent } from './stopwatch-container/stopwatch-container.component';

const routes: Routes = [
  {
    path:"",
    component: StopwatchContainerComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StopwatchRoutingModule { }