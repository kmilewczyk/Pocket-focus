import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WheelSelectComponent } from './wheel-select.component';

describe('WheelSelectComponent', () => {
  let component: WheelSelectComponent;
  let fixture: ComponentFixture<WheelSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WheelSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WheelSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
