import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsedMaterialComponent } from './used-material.component';

describe('UsedMaterialComponent', () => {
  let component: UsedMaterialComponent;
  let fixture: ComponentFixture<UsedMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsedMaterialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsedMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
