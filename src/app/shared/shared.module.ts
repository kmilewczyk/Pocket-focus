import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoverClassDirective } from './hover-class/hover-class.directive';
import { StretchTextareaDirective } from './stretch-textarea/stretch-textarea';
import { PomodoroHeaderComponent } from './pomodoro-header/pomodoro-header.component';
import { RouterModule } from '@angular/router';
import { WheelSelectComponent } from './wheel-select/wheel-select.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [HoverClassDirective, StretchTextareaDirective, PomodoroHeaderComponent, WheelSelectComponent],
  imports: [CommonModule, RouterModule],
  exports: [HoverClassDirective, StretchTextareaDirective, PomodoroHeaderComponent, WheelSelectComponent],
})
export class SharedModule {}
