import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayTypeSelectComponent } from './overlay-type-select.component';

describe('OverlayTypeSelectComponent', () => {
  let component: OverlayTypeSelectComponent;
  let fixture: ComponentFixture<OverlayTypeSelectComponent>;

  beforeEach(async(() => {
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
