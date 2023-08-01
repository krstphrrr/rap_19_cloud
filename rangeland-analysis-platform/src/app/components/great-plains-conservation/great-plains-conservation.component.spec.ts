import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GreatPlainsConservationComponent } from './great-plains-conservation.component';

describe('GreatPlainsConservationComponent', () => {
  let component: GreatPlainsConservationComponent;
  let fixture: ComponentFixture<GreatPlainsConservationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GreatPlainsConservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GreatPlainsConservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
