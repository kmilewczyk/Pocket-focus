import { Component, MissingTranslationStrategy, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations'


enum TimerType {
  Pomodoro,
  Hour,
  Indefinite
};

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

  constructor () {}

  ngOnInit(): void {}

  onTimerTypeSwitch() {
    const switchValues = [ TimerType.Pomodoro, TimerType.Hour, TimerType.Indefinite];

    // Switch to the next in the array; wrap when at the last
    this.timerType = switchValues[(switchValues.indexOf(this.timerType)+1) % switchValues.length];
  }
}
