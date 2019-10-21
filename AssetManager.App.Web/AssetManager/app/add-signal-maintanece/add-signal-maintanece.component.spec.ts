import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSignalMaintaneceComponent } from './add-signal-maintanece.component';

describe('AddSignalMaintaneceComponent', () => {
  let component: AddSignalMaintaneceComponent;
  let fixture: ComponentFixture<AddSignalMaintaneceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSignalMaintaneceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSignalMaintaneceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
