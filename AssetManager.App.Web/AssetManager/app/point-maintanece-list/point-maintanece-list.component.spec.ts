import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointMaintaneceListComponent } from './point-maintanece-list.component';

describe('PointMaintaneceListComponent', () => {
  let component: PointMaintaneceListComponent;
  let fixture: ComponentFixture<PointMaintaneceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointMaintaneceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointMaintaneceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
