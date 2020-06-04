import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialogChangeAddressComponent } from './mat-dialog-change-address.component';

describe('MatDialogChangeAddressComponent', () => {
  let component: MatDialogChangeAddressComponent;
  let fixture: ComponentFixture<MatDialogChangeAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatDialogChangeAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatDialogChangeAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
