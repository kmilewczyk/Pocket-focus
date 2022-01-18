import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UserPreferencesService } from '@app/core';
import { SharedModule } from '../shared.module';

import { PomodoroHeaderComponent } from './pomodoro-header.component';

describe('PomodoroHeaderComponent', () => {
  let component: PomodoroHeaderComponent;
  let fixture: ComponentFixture<PomodoroHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PomodoroHeaderComponent ],
      imports: [ SharedModule, RouterTestingModule.withRoutes([]) ],
      providers: [
        { provide: UserPreferencesService, use: jasmine.createSpyObj('UserPreferencesService', ['getObs']) },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PomodoroHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
