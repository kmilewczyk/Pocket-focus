import { animate, state, style, transition, trigger } from "@angular/animations";

export const triggerOnProductivityVisible = trigger('productivityVisible', [
  state('in', style({ opacity: 1 })),
  transition('void => *', [
    style({ opacity: 0, height: 0, transform: 'translateY(-10rem)' }),
    animate('0.5s'),
  ]),
]);