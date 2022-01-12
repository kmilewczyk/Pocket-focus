import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoverClassDirective } from './hover-class/hover-class.directive';
import { StretchTextareaDirective } from './stretch-textarea/stretch-textarea';
import { PomodoroHeaderComponent } from './pomodoro-header/pomodoro-header.component';
import { UserPreferencesService } from '@app/core';
import { RouterModule } from '@angular/router';
import { SlidableSelectComponent } from './slidable-select/slidable-select.component';

@NgModule({
  declarations: [HoverClassDirective, StretchTextareaDirective, PomodoroHeaderComponent, SlidableSelectComponent],
  imports: [CommonModule, RouterModule],
  exports: [HoverClassDirective, StretchTextareaDirective, PomodoroHeaderComponent, SlidableSelectComponent],
})
export class SharedModule {}
