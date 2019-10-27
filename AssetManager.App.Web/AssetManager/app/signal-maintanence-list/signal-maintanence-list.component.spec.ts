import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalMaintanenceListComponent } from './signal-maintanence-list.component';

describe('SignalMaintanenceListComponent', () => {
  let component: SignalMaintanenceListComponent;
  let fixture: ComponentFixture<SignalMaintanenceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignalMaintanenceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignalMaintanenceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
