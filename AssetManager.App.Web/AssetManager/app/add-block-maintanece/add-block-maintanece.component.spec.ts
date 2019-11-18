import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBlockMaintaneceComponent } from './add-block-maintanece.component';

describe('AddBlockMaintaneceComponent', () => {
  let component: AddBlockMaintaneceComponent;
  let fixture: ComponentFixture<AddBlockMaintaneceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBlockMaintaneceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBlockMaintaneceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
