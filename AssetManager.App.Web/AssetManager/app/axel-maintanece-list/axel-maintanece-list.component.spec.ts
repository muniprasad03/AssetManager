import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AxelMaintaneceListComponent } from './axel-maintanece-list.component';

describe('AxelMaintaneceListComponent', () => {
  let component: AxelMaintaneceListComponent;
  let fixture: ComponentFixture<AxelMaintaneceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AxelMaintaneceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AxelMaintaneceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
