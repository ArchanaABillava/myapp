import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanreqComponent } from './loanreq.component';

describe('LoanreqComponent', () => {
  let component: LoanreqComponent;
  let fixture: ComponentFixture<LoanreqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanreqComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanreqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
