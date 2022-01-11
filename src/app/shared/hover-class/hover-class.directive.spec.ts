import { ElementRef } from '@angular/core';
import { HoverClassDirective } from './hover-class.directive';

describe('HoverClassDirective', () => {
  it('should create an instance', () => {
    const directive = new HoverClassDirective(new ElementRef(null));
    expect(directive).toBeTruthy();
  });
});
