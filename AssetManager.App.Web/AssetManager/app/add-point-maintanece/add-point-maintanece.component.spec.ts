import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPointMaintaneceComponent } from './add-point-maintanece.component';

describe('AddPointMaintaneceComponent', () => {
  let component: AddPointMaintaneceComponent;
  let fixture: ComponentFixture<AddPointMaintaneceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPointMaintaneceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPointMaintaneceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
