import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PomodoroRoutingModule } from './pomodoro-routing.module';
import { PomodoroComponent } from './pomodoro/pomodoro.component';
import { SharedModule } from 'src/shared/shared.module';
import { TimerComponent } from './timer/timer.component';

@NgModule({
  declarations: [PomodoroComponent, TimerComponent],
  imports: [CommonModule, PomodoroRoutingModule, SharedModule],
})
export class PomodoroModule {}
