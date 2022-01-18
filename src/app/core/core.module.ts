import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPreferencesService } from './user-preferences/user-preferences.service';
import { TimerService } from './timer-service/timer.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ],
  providers: [
    UserPreferencesService,
    TimerService
  ]
})
export class CoreModule { }
