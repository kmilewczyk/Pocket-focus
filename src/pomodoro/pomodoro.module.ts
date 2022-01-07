import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PomodoroRoutingModule } from './pomodoro-routing.module';
import { PomodoroComponent } from './pomodoro/pomodoro.component';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  declarations: [PomodoroComponent],
  imports: [CommonModule, PomodoroRoutingModule, SharedModule],
})
export class PomodoroModule {}
