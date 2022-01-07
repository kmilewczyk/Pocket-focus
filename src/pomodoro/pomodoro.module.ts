import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PomodoroRoutingModule } from './pomodoro-routing.module';
import { PomodoroComponent } from './pomodoro/pomodoro.component';


@NgModule({
  declarations: [
    PomodoroComponent
  ],
  imports: [
    CommonModule,
    PomodoroRoutingModule
  ]
})
export class PomodoroModule { }
