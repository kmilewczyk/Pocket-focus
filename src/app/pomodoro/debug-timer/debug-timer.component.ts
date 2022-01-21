import { Component, OnInit } from '@angular/core';
import { TimeKeeper } from '@app/core/timer-service/time-keeper/time-keeper';

@Component({
  selector: 'app-debug-timer',
  templateUrl: './debug-timer.component.html',
  styleUrls: ['./debug-timer.component.scss']
})
export class DebugTimerComponent implements OnInit {
  constructor(private timeKeeper: TimeKeeper) { }

  ngOnInit(): void {
  }

  onDebug() {
    this.timeKeeper.forward(25 * 60);
  }
}
