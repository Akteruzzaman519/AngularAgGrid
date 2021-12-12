import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SonetComponent } from './sonet.component';

describe('SonetComponent', () => {
  let component: SonetComponent;
  let fixture: ComponentFixture<SonetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SonetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SonetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
