import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MesicReferenceComponent } from './mesic-reference.component';

describe('MesicReferenceComponent', () => {
  let component: MesicReferenceComponent;
  let fixture: ComponentFixture<MesicReferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesicReferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MesicReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
