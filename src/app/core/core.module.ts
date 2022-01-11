import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPreferencesService } from './user-preferences/user-preferences.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    UserPreferencesService
  ]
})
export class CoreModule { }
