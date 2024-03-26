import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherCompaniesComponent } from './other-companies.component';

describe('OtherCompaniesComponent', () => {
  let component: OtherCompaniesComponent;
  let fixture: ComponentFixture<OtherCompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OtherCompaniesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OtherCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
