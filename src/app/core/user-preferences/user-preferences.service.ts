import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type UserPreferences = {
  hideGoalToggle: boolean,
  hideScheduleToggle: boolean,
  enableGoalFunctionality: boolean,
  enableScheduleFunctionality: boolean,
  skipLastBreak: boolean,
};

@Injectable()
export class UserPreferencesService {
  private preferences = new BehaviorSubject<UserPreferences>({
    hideGoalToggle: false,
    hideScheduleToggle: false,
    enableGoalFunctionality: false,
    enableScheduleFunctionality: false,
    skipLastBreak: false,
  });

  constructor() {}

  getObs(): Observable<UserPreferences> {
    return this.preferences.asObservable();
  }

  setPreferences(newValues: Partial<UserPreferences>) {
    this.preferences.next({ ...this.preferences.value, ...newValues });
  }
}
