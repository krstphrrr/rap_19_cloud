import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SplashDialogComponent } from './splash-dialog.component';

describe('SplashDialogComponent', () => {
  let component: SplashDialogComponent;
  let fixture: ComponentFixture<SplashDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SplashDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplashDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
