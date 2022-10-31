import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsDotsComponent } from './options-dots.component';

describe('OptionsDotsComponent', () => {
  let component: OptionsDotsComponent;
  let fixture: ComponentFixture<OptionsDotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionsDotsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionsDotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
