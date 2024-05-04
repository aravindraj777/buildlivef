import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyChatsComponent } from './company-chats.component';

describe('CompanyChatsComponent', () => {
  let component: CompanyChatsComponent;
  let fixture: ComponentFixture<CompanyChatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyChatsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyChatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
