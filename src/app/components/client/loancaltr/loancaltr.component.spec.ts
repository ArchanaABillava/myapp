import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoancaltrComponent } from './loancaltr.component';

describe('LoancaltrComponent', () => {
  let component: LoancaltrComponent;
  let fixture: ComponentFixture<LoancaltrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoancaltrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoancaltrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
