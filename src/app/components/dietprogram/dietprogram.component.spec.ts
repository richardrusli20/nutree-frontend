import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DietprogramComponent } from './dietprogram.component';

describe('DietprogramComponent', () => {
  let component: DietprogramComponent;
  let fixture: ComponentFixture<DietprogramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DietprogramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DietprogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
