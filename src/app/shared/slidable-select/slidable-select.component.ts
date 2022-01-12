import {
  animate,
  animateChild,
  query,
  state,
  style,
  transition,
  trigger,
  group,
} from '@angular/animations';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription, timer } from 'rxjs';

enum ComponentAnimationState {
  Normal = 'normal',
  Changing = 'changing'
}

enum ValueAnimationState {
  Normal = 'normal',
  Selected = 'selected',
}

@Component({
  selector: 'app-slidable-select',
  templateUrl: './slidable-select.component.html',
  styleUrls: ['./slidable-select.component.scss'],
  animations: [
    trigger('componentTrigger', [
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
        ComponentAnimationState.Normal +
          ' <=> ' +
          ComponentAnimationState.Changing,
        [group([query('@*', animateChild()), animate(200)])]
      ),
    ]),
    trigger('valueTrigger', [
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
    ]),
  ],
})
export class SlidableSelectComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  readonly elementSize = 5; // in rem
  readonly fontSize = 2.25;
  readonly componentHeight = 10; // in rem
  readonly componentWidth = 14; // in rem
  readonly selectDelay = 300; // in ms

  @Input() values = [
    '20:00',
    '30:00',
    '60:00',
    '90:00',
    '120:00',
    '150:00',
    '180:00',
  ];
  @Input() selectedIndex: number = 1;

  @ViewChild('valuesWrapper') valuesWrapper?: ElementRef;

  valueStates: ValueAnimationState[] = [];
  componentState = ComponentAnimationState.Normal;

  private timer?: Subscription;
  private pointerLastPositionY?: number;
  private previousSelectedElement?: number;

  get scrollDiv(): HTMLDivElement {
    return this.valuesWrapper?.nativeElement as HTMLDivElement;
  }

  get valuesView() {
    return new Array(this.values.entries()).map(([index, value]) => {
      return { text: value, animationState: index };
    });
  }

  constructor() {}

  ngOnInit(): void {
    this.valueStates = Array(this.values?.length)?.fill(ValueAnimationState.Normal);
  }

  ngAfterViewInit(): void {
    this.scheduleCaptureAndFocusElement();
  }

  ngOnDestroy(): void {
    this.timer?.unsubscribe();
  }

  scrollOnPosition(clientY: number) {}

  onWheel(event: WheelEvent) {
    const SCROLL_SPEED = 0.1;
    this.scrollDiv.scrollBy(0, event.deltaY * SCROLL_SPEED);
  }

  onPointerDown(event: PointerEvent) {
    this.pointerLastPositionY = event.clientY;
    this.componentState = ComponentAnimationState.Changing;
    this.timer?.unsubscribe();
  }

  onPointerMove(event: PointerEvent) {
    if (this.pointerLastPositionY) {
      this.scrollDiv.scrollBy(0, this.pointerLastPositionY - event.clientY);
      this.pointerLastPositionY = event.clientY;
      this.scheduleCaptureAndFocusElement();
    }
  }

  onPointerUp(event: PointerEvent) {
    this.pointerLastPositionY = undefined;
  }

  focusSelectedElement() {
    if (this.previousSelectedElement !== undefined) {
      this.valueStates[this.previousSelectedElement] = ValueAnimationState.Normal;
    }

    const boundedIndex = this.boundedIndex(this.selectedIndex);

    // Add "+ 1" to skip the padding element
    const desiredLi = this.scrollDiv.firstElementChild?.childNodes[
      boundedIndex + 1
    ] as HTMLLIElement;

    this.valueStates[boundedIndex] = ValueAnimationState.Selected;

    desiredLi.scrollIntoView({ behavior: 'smooth' });
    // desiredLi.scrollIntoView();

    // In case user dragged the pointer off screen
    this.pointerLastPositionY = undefined;

    this.previousSelectedElement = boundedIndex;

    this.componentState = ComponentAnimationState.Normal;
  }

  boundedIndex(index: number) {
    return Math.min(index, this.values.length - 1);
  }

  convertRemToPixels(rem: number) {
    return (
      rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
    );
  }

  converPixelsToRem(pxs: number) {
    return (
      pxs / parseFloat(getComputedStyle(document.documentElement).fontSize)
    );
  }

  scheduleCaptureAndFocusElement() {
    const scrollHeight =
      this.converPixelsToRem(this.scrollDiv.scrollTop) +
      this.componentHeight / 2;
    const closestElement = Math.floor(scrollHeight / this.elementSize) - 1;
    this.selectedIndex = closestElement;

    this.scheduleFocusElement();
  }

  scheduleFocusElement() {
    this.timer?.unsubscribe();

    this.timer = timer(this.selectDelay).subscribe(() =>
      this.focusSelectedElement()
    );
  }
}
