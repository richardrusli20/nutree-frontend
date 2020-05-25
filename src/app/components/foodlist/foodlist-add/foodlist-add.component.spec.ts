import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodlistAddComponent } from './foodlist-add.component';

describe('FoodlistAddComponent', () => {
  let component: FoodlistAddComponent;
  let fixture: ComponentFixture<FoodlistAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodlistAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodlistAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
