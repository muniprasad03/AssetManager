import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AxelListComponent } from './axel-list.component';

describe('AxelListComponent', () => {
  let component: AxelListComponent;
  let fixture: ComponentFixture<AxelListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AxelListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AxelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
