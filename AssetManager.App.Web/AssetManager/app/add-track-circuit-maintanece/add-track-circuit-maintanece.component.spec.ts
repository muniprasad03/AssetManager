import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrackCircuitMaintaneceComponent } from './add-track-circuit-maintanece.component';

describe('AddTrackCircuitMaintaneceComponent', () => {
  let component: AddTrackCircuitMaintaneceComponent;
  let fixture: ComponentFixture<AddTrackCircuitMaintaneceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTrackCircuitMaintaneceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTrackCircuitMaintaneceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
