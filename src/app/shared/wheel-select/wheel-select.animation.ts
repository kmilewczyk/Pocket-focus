import {
  animate,
  animateChild,
  group,
  query,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  ComponentAnimationState,
  ValueAnimationState,
} from './wheel-select.model';

export const componentTrigger = trigger('componentTrigger', [
  state(
    ComponentAnimationState.Normal,
    style({
      height: '{{ elementSize }}rem',
    }),
    { params: { elementSize: 5 } }
  ),
  state(
    ComponentAnimationState.Changing,
    style({
      height: '{{ componentSize }}rem',
      marginTop: '-{{ moveUp }}rem',
    }),
    { params: { componentSize: 10, moveUp: 2.5 } }
  ),
  transition(
    ComponentAnimationState.Normal + ' <=> ' + ComponentAnimationState.Changing,
    [group([query('@*', animateChild()), animate(200)])]
  ),
]);

export const valueTrigger = trigger('valueTrigger', [
  state(
    ValueAnimationState.Selected,
    style({
      fontSize: '{{ boldFontSize }}rem',
      fontWeight: 'bolder',
    }),
    { params: { boldFontSize: 2.5 } }
  ),
  state(
    ValueAnimationState.Normal,
    style({
      fontSize: '{{ fontSize }}rem',
    }),
    { params: { fontSize: 2 } }
  ),
  transition(
    ValueAnimationState.Normal + ' <=> ' + ValueAnimationState.Selected,
    [animate(200)]
  ),
]);
