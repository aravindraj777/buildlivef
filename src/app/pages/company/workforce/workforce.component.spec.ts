import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkforceComponent } from './workforce.component';

describe('WorkforceComponent', () => {
  let component: WorkforceComponent;
  let fixture: ComponentFixture<WorkforceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkforceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkforceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
