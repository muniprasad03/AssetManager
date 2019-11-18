import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAxelMaintaneceComponent } from './add-axel-maintanece.component';

describe('AddAxelMaintaneceComponent', () => {
  let component: AddAxelMaintaneceComponent;
  let fixture: ComponentFixture<AddAxelMaintaneceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAxelMaintaneceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAxelMaintaneceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
