import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeBottomComponent } from './welcome-bottom.component';

describe('WelcomeBottomComponent', () => {
  let component: WelcomeBottomComponent;
  let fixture: ComponentFixture<WelcomeBottomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeBottomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
