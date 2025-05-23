import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UrlResolverComponent } from './url-resolver.component';

describe('UrlResolverComponent', () => {
  let component: UrlResolverComponent;
  let fixture: ComponentFixture<UrlResolverComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UrlResolverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlResolverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
