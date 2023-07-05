import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateloanComponent } from './updateloan.component';

describe('UpdateloanComponent', () => {
  let component: UpdateloanComponent;
  let fixture: ComponentFixture<UpdateloanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateloanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateloanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
