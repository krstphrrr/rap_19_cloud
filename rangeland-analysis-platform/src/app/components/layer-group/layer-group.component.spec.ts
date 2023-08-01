import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LayerGroupComponent } from './layer-group.component';

describe('LayerGroupComponent', () => {
  let component: LayerGroupComponent;
  let fixture: ComponentFixture<LayerGroupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LayerGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
