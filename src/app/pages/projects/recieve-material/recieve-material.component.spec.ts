import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecieveMaterialComponent } from './recieve-material.component';

describe('RecieveMaterialComponent', () => {
  let component: RecieveMaterialComponent;
  let fixture: ComponentFixture<RecieveMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecieveMaterialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecieveMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
