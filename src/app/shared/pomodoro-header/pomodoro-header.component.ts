import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserPreferences, UserPreferencesService } from '@app/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-pomodoro-header',
  templateUrl: './pomodoro-header.component.html',
  styleUrls: ['./pomodoro-header.component.scss']
})
export class PomodoroHeaderComponent implements OnInit, OnDestroy {
  userPreferences$?: Observable<UserPreferences>;

  constructor(private preferenceService: UserPreferencesService) { }
  
  ngOnInit(): void {
    this.userPreferences$ = this.preferenceService.getObs();
  }

  ngOnDestroy(): void {
  }
}
