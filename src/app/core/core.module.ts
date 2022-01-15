import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPreferencesService } from './user-preferences/user-preferences.service';
import { SessionTimeService } from './session-time/session-time.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    UserPreferencesService,
    SessionTimeService
  ]
})
export class CoreModule { }
