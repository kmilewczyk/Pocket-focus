import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebugTimerComponent } from './debug-timer.component';

describe('DebugTimerComponent', () => {
  let component: DebugTimerComponent;
  let fixture: ComponentFixture<DebugTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebugTimerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DebugTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
