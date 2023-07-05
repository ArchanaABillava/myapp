import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaneligibleComponent } from './loaneligible.component';

describe('LoaneligibleComponent', () => {
  let component: LoaneligibleComponent;
  let fixture: ComponentFixture<LoaneligibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoaneligibleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoaneligibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
