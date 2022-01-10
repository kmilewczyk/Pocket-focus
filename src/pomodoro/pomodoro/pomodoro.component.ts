import { Component, OnInit } from '@angular/core';


enum TimerType {
  Pomodoro,
  Hour,
  Indefinite
};

@Component({
  selector: 'app-pomodoro',
  templateUrl: './pomodoro.component.html',
  styleUrls: ['./pomodoro.component.scss'],
})
export class PomodoroComponent implements OnInit {
  TimerType = TimerType;

  timerType: TimerType = TimerType.Pomodoro;

  constructor () {}

  ngOnInit(): void {}

  onTimerTypeSwitch() {
    const switchValues = [ TimerType.Pomodoro, TimerType.Hour, TimerType.Indefinite];

    // Switch to the next in the array; wrap when at the last
    this.timerType = switchValues[(switchValues.indexOf(this.timerType)+1) % switchValues.length];
  }
}
