import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWorkforceComponent } from './create-workforce.component';

describe('CreateWorkforceComponent', () => {
  let component: CreateWorkforceComponent;
  let fixture: ComponentFixture<CreateWorkforceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateWorkforceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateWorkforceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
