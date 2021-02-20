import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryProfileComponent } from './delivery-profile.component';

describe('DeliveryProfileComponent', () => {
  let component: DeliveryProfileComponent;
  let fixture: ComponentFixture<DeliveryProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
