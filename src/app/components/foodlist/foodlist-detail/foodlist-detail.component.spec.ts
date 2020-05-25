import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodlistDetailComponent } from './foodlist-detail.component';

describe('FoodlistDetailComponent', () => {
  let component: FoodlistDetailComponent;
  let fixture: ComponentFixture<FoodlistDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodlistDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodlistDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
