import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPartnershipComponent } from './register-partnership.component';

describe('RegisterPartnershipComponent', () => {
  let component: RegisterPartnershipComponent;
  let fixture: ComponentFixture<RegisterPartnershipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterPartnershipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPartnershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
