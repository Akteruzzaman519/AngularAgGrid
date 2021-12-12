import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaimComponent } from './naim.component';

describe('NaimComponent', () => {
  let component: NaimComponent;
  let fixture: ComponentFixture<NaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NaimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
