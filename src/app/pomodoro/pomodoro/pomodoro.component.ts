import { Component, MissingTranslationStrategy, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations'
import { TimerType } from '@app/shared/model/timer-type.model';
import { SlidableSelectComponent } from '@app/shared/slidable-select/slidable-select.component';
import { SessionTimeService } from '@app/core/session-time/session-time.service';
import { Observable, Observer, take } from 'rxjs';


@Component({
  selector: 'app-pomodoro',
  templateUrl: './pomodoro.component.html',
  styleUrls: ['./pomodoro.component.scss'],
  animations: [
    trigger ('productivityVisible', [
      state('in', style({
        opacity: 1,
      })),
      transition('void => *', [
          style({
            opacity: 0,
            height: 0,
            transform: 'translateY(-10rem)'
          }),
          animate('0.5s')
      ])
    ])
  ]
})
export class PomodoroComponent implements OnInit {
  TimerType = TimerType;

  timerType$?: Observable<TimerType>;
  goalsVisible = false;
  timerRunning = false;
  editMode = false;

  get totalTime() {
    return "1 hour";
  }

  constructor (private sessionTime: SessionTimeService) {}

  ngOnInit(): void {
    this.timerType$ = this.sessionTime.timerType$;
  }

  onTimerTypeSwitch() {
    const switchValues = [ TimerType.Pomodoro, TimerType.Hour, TimerType.Indefinite];

    this.timerType$?.pipe(take(1)).subscribe(timerType => {
      // Switch to the next in the array; wrap when at the last
      const newType = switchValues[(switchValues.indexOf(timerType)+1) % switchValues.length];

      this.sessionTime.setTimerType(newType);
    });
  }

  onClose () {
    this.timerRunning = false;
  }

  onEditSwitch() {
    this.editMode = !this.editMode;
  }
}
