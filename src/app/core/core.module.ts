import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPreferencesService } from './user-preferences/user-preferences.service';
import { TimerService } from './timer-service/timer.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    UserPreferencesService,
    TimerService
  ]
})
export class CoreModule { }
