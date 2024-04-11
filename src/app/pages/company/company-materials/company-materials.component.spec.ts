import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyMaterialsComponent } from './company-materials.component';

describe('CompanyMaterialsComponent', () => {
  let component: CompanyMaterialsComponent;
  let fixture: ComponentFixture<CompanyMaterialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyMaterialsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
