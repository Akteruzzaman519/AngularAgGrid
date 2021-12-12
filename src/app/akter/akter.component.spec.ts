import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AkterComponent } from './akter.component';

describe('AkterComponent', () => {
  let component: AkterComponent;
  let fixture: ComponentFixture<AkterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AkterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AkterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
