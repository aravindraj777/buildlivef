import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialEntryDetailsComponent } from './material-entry-details.component';

describe('MaterialEntryDetailsComponent', () => {
  let component: MaterialEntryDetailsComponent;
  let fixture: ComponentFixture<MaterialEntryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaterialEntryDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaterialEntryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
