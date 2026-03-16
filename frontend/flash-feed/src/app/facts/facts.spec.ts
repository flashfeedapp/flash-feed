import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Facts } from './facts';

describe('Facts', () => {
  let component: Facts;
  let fixture: ComponentFixture<Facts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Facts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Facts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
