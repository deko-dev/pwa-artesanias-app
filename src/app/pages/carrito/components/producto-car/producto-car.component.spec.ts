import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoCarComponent } from './producto-car.component';

describe('ProductoCarComponent', () => {
  let component: ProductoCarComponent;
  let fixture: ComponentFixture<ProductoCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoCarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
