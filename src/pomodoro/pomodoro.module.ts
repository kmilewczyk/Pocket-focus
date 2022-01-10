import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PomodoroRoutingModule } from './pomodoro-routing.module';
import { PomodoroComponent } from './pomodoro/pomodoro.component';
import { SharedModule } from 'src/shared/shared.module';
import { TimerComponent } from './timer/timer.component';
import { ProductivityComponent } from './productivity/productivity.component';

@NgModule({
  declarations: [PomodoroComponent, TimerComponent, ProductivityComponent],
  imports: [CommonModule, PomodoroRoutingModule, SharedModule],
})
export class PomodoroModule {}
