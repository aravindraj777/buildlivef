import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProjectroleComponent } from './edit-projectrole.component';

describe('EditProjectroleComponent', () => {
  let component: EditProjectroleComponent;
  let fixture: ComponentFixture<EditProjectroleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditProjectroleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditProjectroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
