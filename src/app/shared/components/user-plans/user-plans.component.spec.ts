import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPlansComponent } from './user-plans.component';

describe('UserPlansComponent', () => {
  let component: UserPlansComponent;
  let fixture: ComponentFixture<UserPlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserPlansComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
