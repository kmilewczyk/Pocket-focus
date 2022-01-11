import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PomodoroSettingsComponent } from './pomodoro-settings/pomodoro-settings.component';

const routes: Routes = [{ path: '', component: PomodoroSettingsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PomodoroSettingsRoutingModule { }
