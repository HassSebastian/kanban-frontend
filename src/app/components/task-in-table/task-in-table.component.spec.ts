import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskInTableComponent } from './task-in-table.component';

describe('TaskInTableComponent', () => {
  let component: TaskInTableComponent;
  let fixture: ComponentFixture<TaskInTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskInTableComponent]
    });
    fixture = TestBed.createComponent(TaskInTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
