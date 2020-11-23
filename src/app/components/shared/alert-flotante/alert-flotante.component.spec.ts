import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertFlotanteComponent } from './alert-flotante.component';

describe('AlertFlotanteComponent', () => {
  let component: AlertFlotanteComponent;
  let fixture: ComponentFixture<AlertFlotanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertFlotanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertFlotanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
