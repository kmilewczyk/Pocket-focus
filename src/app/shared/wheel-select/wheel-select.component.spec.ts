import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../shared.module';

import { WheelSelectComponent } from './wheel-select.component';

describe('WheelSelectComponent', () => {
  let component: WheelSelectComponent;
  let fixture: ComponentFixture<WheelSelectComponent>;

  beforeEach(async () => {
    const cdrSpy = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);

    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      declarations: [WheelSelectComponent],
      providers: [{ provide: ChangeDetectorRef, useValue: cdrSpy }],
    }).compileComponents();
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
