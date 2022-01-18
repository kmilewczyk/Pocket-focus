import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PomodoroRoutingModule } from './pomodoro-routing.module';
import { PomodoroComponent } from './pomodoro/pomodoro.component';
import { SharedModule } from '@app/shared/shared.module';
import { TimerComponent } from './timer/timer.component';
import { ProductivityComponent } from './productivity/productivity.component';
import { FormsModule } from '@angular/forms';
import { UpperLabelComponent } from './upper-label/upper-label.component';
import { BreakTimeHintComponent } from './break-time-hint/break-time-hint.component';

@NgModule({
  declarations: [PomodoroComponent, TimerComponent, ProductivityComponent, UpperLabelComponent, BreakTimeHintComponent],
  imports: [CommonModule, PomodoroRoutingModule, SharedModule, FormsModule],
})
export class PomodoroModule {}
