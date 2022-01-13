import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TimerType } from '@app/shared/model/timer-type.model';
import { SlidableSelectComponent } from '@app/shared/slidable-select/slidable-select.component';

const pomodoroOptionLabels = [
  "20:00",
  "30:00",
  "60:00",
  "1:30:00",
  "2:00:00",
  "2:30:00",
  "3:00:00",
  "3:30:00",
  "4:00:00",
]

const hourOptionLabels = [
  "1:00:00",
  "2:00:00",
  "3:00:00",
  "4:00:00",
];

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  @Input() editMode = false;
  @Input() timerType = TimerType.Pomodoro;

  workSliceTime: number = 25;
  breakLength: number = 5; // in minutes

  valueOptionsLabels = pomodoroOptionLabels;
  selection = 1;

  constructor() { }

  ngOnInit(): void {
  }

}
