import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoverClassDirective } from './hover-class/hover-class.directive';
import { StretchTextareaDirective } from './stretch-textarea/stretch-textarea';
import { PomodoroHeaderComponent } from './pomodoro-header/pomodoro-header.component';
import { UserPreferencesService } from '@app/core';

@NgModule({
  declarations: [HoverClassDirective, StretchTextareaDirective, PomodoroHeaderComponent],
  imports: [CommonModule],
  exports: [HoverClassDirective, StretchTextareaDirective, PomodoroHeaderComponent],
})
export class SharedModule {}
