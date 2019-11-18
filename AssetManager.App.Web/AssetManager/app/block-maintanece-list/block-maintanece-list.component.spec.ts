import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockMaintaneceListComponent } from './block-maintanece-list.component';

describe('BlockMaintaneceListComponent', () => {
  let component: BlockMaintaneceListComponent;
  let fixture: ComponentFixture<BlockMaintaneceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockMaintaneceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockMaintaneceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
