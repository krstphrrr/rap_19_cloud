import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SagebrushConservationComponent } from './sagebrush-conservation.component';

describe('SagebrushConservationComponent', () => {
  let component: SagebrushConservationComponent;
  let fixture: ComponentFixture<SagebrushConservationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SagebrushConservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SagebrushConservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
