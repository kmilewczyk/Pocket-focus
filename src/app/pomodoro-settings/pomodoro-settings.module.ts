import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PomodoroSettingsRoutingModule } from './pomodoro-settings-routing.module';
import { PomodoroSettingsComponent } from './pomodoro-settings/pomodoro-settings.component';
import { SharedModule } from '@app/shared/shared.module';


@NgModule({
  declarations: [
    PomodoroSettingsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PomodoroSettingsRoutingModule
  ]
})
export class PomodoroSettingsModule { }
