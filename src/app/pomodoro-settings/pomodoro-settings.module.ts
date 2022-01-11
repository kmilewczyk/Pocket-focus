import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PomodoroSettingsRoutingModule } from './pomodoro-settings-routing.module';
import { PomodoroSettingsComponent } from './pomodoro-settings/pomodoro-settings.component';


@NgModule({
  declarations: [
    PomodoroSettingsComponent
  ],
  imports: [
    CommonModule,
    PomodoroSettingsRoutingModule
  ]
})
export class PomodoroSettingsModule { }
