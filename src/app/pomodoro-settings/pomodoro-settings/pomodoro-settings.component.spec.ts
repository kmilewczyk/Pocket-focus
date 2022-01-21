import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { UserPreferencesService } from '@app/core';
import { SharedModule } from '@app/shared/shared.module';

import { PomodoroSettingsComponent } from './pomodoro-settings.component';

describe('PomodoroSettingsComponent', () => {
  let component: PomodoroSettingsComponent;
  let fixture: ComponentFixture<PomodoroSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PomodoroSettingsComponent ],
      imports: [SharedModule, RouterTestingModule],
      providers: [
        { provide: UserPreferencesService, use: {}}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PomodoroSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
