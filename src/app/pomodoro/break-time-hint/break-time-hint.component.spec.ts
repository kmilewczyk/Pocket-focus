import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakTimeHintComponent } from './break-time-hint.component';

describe('BreakTimeHintComponent', () => {
  let component: BreakTimeHintComponent;
  let fixture: ComponentFixture<BreakTimeHintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreakTimeHintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreakTimeHintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
