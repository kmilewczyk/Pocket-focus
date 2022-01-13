import { Component, MissingTranslationStrategy, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations'
import { TimerType } from '@app/shared/model/timer-type.model';
import { SlidableSelectComponent } from '@app/shared/slidable-select/slidable-select.component';


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

  timerType: TimerType = TimerType.Pomodoro;
  goalsVisible = false;
  timerRunning = false;
  editMode = false;

  constructor () {}

  ngOnInit(): void {}

  onTimerTypeSwitch() {
    const switchValues = [ TimerType.Pomodoro, TimerType.Hour, TimerType.Indefinite];

    // Switch to the next in the array; wrap when at the last
    this.timerType = switchValues[(switchValues.indexOf(this.timerType)+1) % switchValues.length];
  }

  onClose () {
    this.timerRunning = false;
  }

  onEditSwitch() {
    this.editMode = !this.editMode;
  }
}
