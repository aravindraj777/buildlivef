import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsedMaterialsComponent } from './used-materials.component';

describe('UsedMaterialsComponent', () => {
  let component: UsedMaterialsComponent;
  let fixture: ComponentFixture<UsedMaterialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsedMaterialsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsedMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
