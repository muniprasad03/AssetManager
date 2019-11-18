import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackCircuitMaintaneceListComponent } from './track-circuit-maintanece-list.component';

describe('TrackCircuitMaintaneceListComponent', () => {
  let component: TrackCircuitMaintaneceListComponent;
  let fixture: ComponentFixture<TrackCircuitMaintaneceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackCircuitMaintaneceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackCircuitMaintaneceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
