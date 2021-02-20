import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryUserProfileComponent } from './delivery-user-profile.component';

describe('DeliveryUserProfileComponent', () => {
  let component: DeliveryUserProfileComponent;
  let fixture: ComponentFixture<DeliveryUserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryUserProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
