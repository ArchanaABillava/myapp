import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllloansComponent } from './allloans.component';

describe('AllloansComponent', () => {
  let component: AllloansComponent;
  let fixture: ComponentFixture<AllloansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllloansComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllloansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
