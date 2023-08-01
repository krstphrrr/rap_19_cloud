import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OverlayTypeSelectComponent } from './overlay-type-select.component';

describe('OverlayTypeSelectComponent', () => {
  let component: OverlayTypeSelectComponent;
  let fixture: ComponentFixture<OverlayTypeSelectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OverlayTypeSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverlayTypeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
