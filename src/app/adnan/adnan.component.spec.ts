import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdnanComponent } from './adnan.component';

describe('AdnanComponent', () => {
  let component: AdnanComponent;
  let fixture: ComponentFixture<AdnanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdnanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdnanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
