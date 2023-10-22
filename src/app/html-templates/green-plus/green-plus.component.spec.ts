import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreenPlusComponent } from './green-plus.component';

describe('GreenPlusComponent', () => {
  let component: GreenPlusComponent;
  let fixture: ComponentFixture<GreenPlusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GreenPlusComponent],
    });
    fixture = TestBed.createComponent(GreenPlusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
