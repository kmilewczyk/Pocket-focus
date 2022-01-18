import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpperLabelComponent } from './upper-label.component';

describe('UpperLabelComponent', () => {
  let component: UpperLabelComponent;
  let fixture: ComponentFixture<UpperLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpperLabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpperLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
