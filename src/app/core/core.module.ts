import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPreferencesService } from './user-preferences/user-preferences.service';
import { TimerService } from './timer-service/timer.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TimeKeeper } from './timer-service/time-keeper/time-keeper';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ],
  providers: [
    UserPreferencesService,
    TimeKeeper,
    TimerService,
  ]
})
export class CoreModule { }
