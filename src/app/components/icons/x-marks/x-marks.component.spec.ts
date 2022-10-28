import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XMarksComponent } from './x-marks.component';

describe('XMarksComponent', () => {
  let component: XMarksComponent;
  let fixture: ComponentFixture<XMarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XMarksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
