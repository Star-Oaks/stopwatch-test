import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StopwatchContainerComponent } from './stopwatch-container/stopwatch-container.component';
import { StopwatchRoutingModule } from './stopwatch-routing.module';
import { StorageService } from './storage.service';



@NgModule({
  declarations: [StopwatchContainerComponent],
  imports: [
    CommonModule,
    StopwatchRoutingModule
  ],
  providers:[
    StorageService
  ]
})
export class StopwatchModule { }
