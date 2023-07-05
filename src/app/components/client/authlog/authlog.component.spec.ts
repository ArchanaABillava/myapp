import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthlogComponent } from './authlog.component';

describe('AuthlogComponent', () => {
  let component: AuthlogComponent;
  let fixture: ComponentFixture<AuthlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthlogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
