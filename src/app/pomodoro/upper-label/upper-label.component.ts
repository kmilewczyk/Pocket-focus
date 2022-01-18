import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TimerService } from '@app/core/timer-service/timer.service';
import { TimerState } from '@app/shared/model/timer-state.model';
import { TimerType } from '@app/shared/model/timer-type.model';
import { map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-pomodoro-upper-label',
  templateUrl: './upper-label.component.html',
  styleUrls: ['./upper-label.component.scss']
})
export class UpperLabelComponent implements OnInit {
  TimerType = TimerType;
  TimerState = TimerState;

  @Input() editMode?: boolean;

  totalTime$?: Observable<number>;
  timerType$?: Observable<TimerType>
  timerState$?: Observable<TimerState>;
  minutesRemaining$?: Observable<number>;
  timerActive$?: Observable<boolean>;

  constructor(public timerService: TimerService) { }

  ngOnInit(): void {
    this.totalTime$ = this.timerService.totalSessionTime$.pipe(map(seconds => Math.ceil(seconds / 60)));
    this.timerType$ = this.timerService.timerType$;
    this.timerState$ = this.timerService.timerState$;
    this.minutesRemaining$ = this.timerService.timeRemaining$.pipe(map(seconds => Math.ceil(seconds / 60)));
    this.timerActive$ = this.timerService.timerState$.pipe(map(state => state !== TimerState.Dead));
  }
}
