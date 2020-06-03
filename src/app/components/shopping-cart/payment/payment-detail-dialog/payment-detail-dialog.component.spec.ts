import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentDetailDialogComponent } from './payment-detail-dialog.component';

describe('PaymentDetailDialogComponent', () => {
  let component: PaymentDetailDialogComponent;
  let fixture: ComponentFixture<PaymentDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
