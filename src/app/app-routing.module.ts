import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@app/pomodoro/pomodoro.module').then((m) => m.PomodoroModule),
  },
  { path: 'settings', loadChildren: () => import('@app/pomodoro-settings/pomodoro-settings.module').then(m => m.PomodoroSettingsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
