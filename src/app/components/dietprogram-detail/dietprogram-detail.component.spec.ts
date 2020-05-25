import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DietprogramDetailComponent } from './dietprogram-detail.component';

describe('DietprogramDetailComponent', () => {
  let component: DietprogramDetailComponent;
  let fixture: ComponentFixture<DietprogramDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DietprogramDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DietprogramDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
