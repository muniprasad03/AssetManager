import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAxelComponent } from './add-axel.component';

describe('AddAxelComponent', () => {
  let component: AddAxelComponent;
  let fixture: ComponentFixture<AddAxelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAxelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAxelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
