import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { componentTrigger, valueTrigger } from './slidable-select.animation';
import {
  ComponentAnimationState,
  ValueAnimationState,
} from './slidable-select.model';

@Component({
  selector: 'app-slidable-select',
  templateUrl: './slidable-select.component.html',
  styleUrls: ['./slidable-select.component.scss'],
  animations: [componentTrigger, valueTrigger],
})
export class SlidableSelectComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  readonly selectDelay = 300; // in ms

  @Input() elementSize = 5; // in rem
  @Input() fontSize = 2.25;
  @Input() componentHeight = 10; // in rem
  @Input() componentWidth = 14; // in rem
  @Input() sliderClass = '';

  @Input()
  get labels() {
    return this.labelsValue;
  }
  set labels(value: string[]) {
    this.labelsValue = value;

    this.onLabelsUpdate();
  }

  @Output() selectedIndexChange = new EventEmitter<number>();
  @Input()
  get selectedIndex() {
    return this.selectedIndexValue;
  }
  set selectedIndex(value: number) {
    this.selectedIndexValue = value;
    this.selectedIndexChange.emit(value);
  }

  @ViewChild('valuesWrapper') valuesWrapper?: ElementRef;

  valueStates: ValueAnimationState[] = [];
  componentState = ComponentAnimationState.Normal;

  private selectedIndexValue: number = 1;
  private labelsValue = [
    '20:00',
    '30:00',
    '60:00',
    '90:00',
    '120:00',
    '150:00',
    '180:00',
  ];
  private timer?: Subscription;
  private pointerLastPositionY?: number;
  private previousSelectedElement?: number;

  get scrollDiv(): HTMLDivElement {
    return this.valuesWrapper?.nativeElement as HTMLDivElement;
  }

  get userSelecting(): boolean {
    return this.pointerLastPositionY !== undefined;
  }

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.onLabelsUpdate();
  }

  ngAfterViewInit(): void {
    this.focusSelectedElement();
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.timer?.unsubscribe();
  }

  public moveOneDown() {
    if (this.selectedIndex + 1 < this.labelsValue.length) {
      this.selectedIndex += 1;
      this.focusSelectedElement();
    }
  }

  public moveOneUp() {
    if (this.selectedIndex - 1 >= 0) {
      this.selectedIndex -= 1;
      this.focusSelectedElement();
    }
  }

  onWheel(event: WheelEvent) {
    const SCROLL_SPEED = 0.1;
    this.scrollDiv.scrollBy(0, event.deltaY * SCROLL_SPEED);
    this.scheduleCaptureAndFocusElement();
  }

  onPointerDown(event: PointerEvent) {
    this.pointerLastPositionY = event.clientY;
    this.componentState = ComponentAnimationState.Changing;
    this.scheduleFocusElement();
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

  private focusSelectedElement() {
    if (this.previousSelectedElement !== undefined) {
      this.valueStates[this.previousSelectedElement] =
        ValueAnimationState.Normal;
    }

    const boundedIndex = this.boundedIndex(this.selectedIndex);

    // Add "+ 1" to skip the padding element
    const desiredLi = this.scrollDiv.firstElementChild?.childNodes[
      boundedIndex + 1
    ] as HTMLLIElement;

    this.valueStates[boundedIndex] = ValueAnimationState.Selected;

    this.previousSelectedElement = boundedIndex;

    desiredLi.scrollIntoView({ behavior: 'smooth' });

    this.setComponentStateToNormal();
  }

  private boundedIndex(index: number) {
    return Math.min(index, this.labels.length - 1);
  }

  private converPixelsToRem(pxs: number) {
    return (
      pxs / parseFloat(getComputedStyle(document.documentElement).fontSize)
    );
  }

  private scheduleCaptureAndFocusElement() {
    const scrollHeight =
      this.converPixelsToRem(this.scrollDiv.scrollTop) +
      this.componentHeight / 2;
    const closestElement = Math.floor(scrollHeight / this.elementSize) - 1;
    this.selectedIndex = closestElement;

    this.scheduleFocusElement();
  }

  private scheduleFocusElement() {
    this.timer?.unsubscribe();

    this.timer = timer(this.selectDelay).subscribe(() =>
      this.focusSelectedElement()
    );
  }

  private onLabelsUpdate() {
    this.valueStates = Array(this.labels?.length)?.fill(
      ValueAnimationState.Normal
    );
  }

  private setComponentStateToNormal() {
    // In case user dragged the pointer off screen
    this.pointerLastPositionY = undefined;

    this.componentState = ComponentAnimationState.Normal;
  }
}
