import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[app-stretch]',
})
export class StretchTextareaDirective {
  constructor(public elementRef: ElementRef) {}

  @HostListener('input') onInput() {
    const elem = this.elementRef.nativeElement;

    elem.style.height = '';
    elem.style.height = (elem.scrollHeight + 5) + 'px';
  }
}
