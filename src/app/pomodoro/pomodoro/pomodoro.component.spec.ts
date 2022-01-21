import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UserPreferencesService } from '@app/core';
import { TimeKeeper } from '@app/core/timer-service/time-keeper/time-keeper';
import { TimerService } from '@app/core/timer-service/timer.service';
import { SharedModule } from '@app/shared/shared.module';
import { PomodoroModule } from '../pomodoro.module';

import { PomodoroComponent } from './pomodoro.component';

describe('PomodoroComponent', () => {
  let component: PomodoroComponent;
  let fixture: ComponentFixture<PomodoroComponent>;

  beforeEach(async () => {
    const timerService = jasmine.createSpyObj('TimerService', ['timerType$']);

    await TestBed.configureTestingModule({
      declarations: [PomodoroComponent],
      imports: [SharedModule, RouterTestingModule, PomodoroModule],
      providers: [
        { provide: TimerService, use: timerService },
        { provide: TimeKeeper, use: {} },
        { provide: UserPreferencesService, use: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PomodoroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
