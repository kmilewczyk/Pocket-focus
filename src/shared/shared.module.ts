import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoverClassDirective } from './hover-class/hover-class.directive';
import { StretchTextareaDirective } from './stretch-textarea/stretch-textarea';

@NgModule({
  declarations: [HoverClassDirective, StretchTextareaDirective],
  imports: [CommonModule],
  exports: [HoverClassDirective, StretchTextareaDirective],
})
export class SharedModule {}
