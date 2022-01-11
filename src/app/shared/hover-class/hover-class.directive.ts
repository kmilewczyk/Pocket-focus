import { Directive, HostListener, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[hover-class]',
})
export class HoverClassDirective {
  constructor(public elementRef: ElementRef) {}

  @Input('hover-class') hoverClass!: string;
  @Input('hover-replace') hoverReplace?: string;

  @HostListener('mouseenter') onMouseEnter() {
    this.elementRef.nativeElement.classList.add(this.hoverClass);
    if (this.hoverReplace) {
      this.elementRef.nativeElement.classList.remove(this.hoverReplace);
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.elementRef.nativeElement.classList.remove(this.hoverClass);
    if (this.hoverReplace) {
      this.elementRef.nativeElement.classList.add(this.hoverReplace);
    }
  }
}
