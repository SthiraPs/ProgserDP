import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRequestsComponent } from './create-requests.component';

describe('CreateRequestsComponent', () => {
  let component: CreateRequestsComponent;
  let fixture: ComponentFixture<CreateRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRequestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
