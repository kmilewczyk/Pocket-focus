import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PomodoroHeaderComponent } from './pomodoro-header.component';

describe('PomodoroHeaderComponent', () => {
  let component: PomodoroHeaderComponent;
  let fixture: ComponentFixture<PomodoroHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PomodoroHeaderComponent ]
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
