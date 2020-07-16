import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatSuccessAddtocartComponent } from './mat-success-addtocart.component';

describe('MatSuccessAddtocartComponent', () => {
  let component: MatSuccessAddtocartComponent;
  let fixture: ComponentFixture<MatSuccessAddtocartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatSuccessAddtocartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatSuccessAddtocartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
