import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidableSelectComponent } from './slidable-select.component';

describe('SlidableSelectComponent', () => {
  let component: SlidableSelectComponent;
  let fixture: ComponentFixture<SlidableSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlidableSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidableSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
