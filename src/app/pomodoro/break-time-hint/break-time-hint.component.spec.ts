import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TimerService } from '@app/core/timer-service/timer.service';
import { TimerState } from '@app/shared/model/timer-state.model';
import { TimerType } from '@app/shared/model/timer-type.model';
import { BehaviorSubject } from 'rxjs';

import { BreakTimeHintComponent } from './break-time-hint.component';

const DEFAULT_BREAK_PERIOD = 7;

describe('BreakTimeHintComponent', () => {
  let component: BreakTimeHintComponent;
  let fixture: ComponentFixture<BreakTimeHintComponent>;
  let timerState$: BehaviorSubject<TimerState>;
  let timerType$: BehaviorSubject<TimerType>;
  let timer$: BehaviorSubject<{ state: TimerState; secondsLeft?: number }>;
  let timerService: Partial<TimerService>;

  beforeEach(async () => {
    ({timerState$, timerType$, timer$, timerService} = mockTimerService());
    
    await TestBed.configureTestingModule({
      declarations: [ BreakTimeHintComponent ],
      providers: [
        { provide: TimerService, useValue: timerService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreakTimeHintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("shouldn't display anything on break", () => {
    timerState$.next(TimerState.Break);
    fixture.detectChanges(); 

    let breakTime = fixture.debugElement.query(By.all());
    expect(breakTime).toBeNull();
  });

  it('should display set breakPeriod', () => {
    let breakTime = fixture.debugElement.query(By.css('#breakTime'));
    let breakTimeSpan = breakTime.nativeElement as HTMLSpanElement;

    expect(breakTime).withContext('time span is displayed').toBeTruthy();
    expect(breakTimeSpan.textContent).withContext('time value is equal to the one set').toEqual(DEFAULT_BREAK_PERIOD.toString());
  });
});

function mockTimerService(): {
  timerState$: BehaviorSubject<TimerState>;
  timerType$: BehaviorSubject<TimerType>;
  timerService: Partial<TimerService>;
  timer$: BehaviorSubject<{ state: TimerState; secondsLeft?: number }>;
} {
  let timerState$ = new BehaviorSubject<TimerState>(TimerState.Dead);
  let timerType$ = new BehaviorSubject<TimerType>(TimerType.Pomodoro);
  let timer$ = new BehaviorSubject<{ state: TimerState; secondsLeft?: number }>(
    { state: TimerState.Dead }
  );

  return {
    timerState$,
    timerType$,
    timer$,
    timerService: {
      timerState$,
      timerType$,
      timer$,
      breakPeriod: DEFAULT_BREAK_PERIOD * 60,
    },
  };
}