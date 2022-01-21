import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StretchTextareaDirective } from './stretch-textarea/stretch-textarea';
import { PomodoroHeaderComponent } from './pomodoro-header/pomodoro-header.component';
import { RouterModule } from '@angular/router';
import { WheelSelectComponent } from './wheel-select/wheel-select.component';
import { DefaultPipe } from './default-pipe/default.pipe';

@NgModule({
  declarations: [StretchTextareaDirective, PomodoroHeaderComponent, WheelSelectComponent, DefaultPipe],
  imports: [CommonModule, RouterModule],
  exports: [StretchTextareaDirective, PomodoroHeaderComponent, WheelSelectComponent, DefaultPipe],
})
export class SharedModule {}
