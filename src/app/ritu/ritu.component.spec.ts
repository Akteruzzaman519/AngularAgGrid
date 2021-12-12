import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RituComponent } from './ritu.component';

describe('RituComponent', () => {
  let component: RituComponent;
  let fixture: ComponentFixture<RituComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RituComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RituComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
