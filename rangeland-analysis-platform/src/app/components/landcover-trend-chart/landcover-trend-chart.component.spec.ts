import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MesicChartComponent } from './mesic-chart.component';

describe('MesicChartComponent', () => {
  let component: MesicChartComponent;
  let fixture: ComponentFixture<MesicChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesicChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MesicChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
