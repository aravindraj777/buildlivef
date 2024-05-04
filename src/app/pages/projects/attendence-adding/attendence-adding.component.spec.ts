import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendenceAddingComponent } from './attendence-adding.component';

describe('AttendenceAddingComponent', () => {
  let component: AttendenceAddingComponent;
  let fixture: ComponentFixture<AttendenceAddingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttendenceAddingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttendenceAddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
