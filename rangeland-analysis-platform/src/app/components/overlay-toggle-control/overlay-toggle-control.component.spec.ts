import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OverlayToggleControlComponent } from './overlay-toggle-control.component';

describe('OverlayToggleControlComponent', () => {
  let component: OverlayToggleControlComponent;
  let fixture: ComponentFixture<OverlayToggleControlComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OverlayToggleControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverlayToggleControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
