import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoorGraphComponent } from './door-graph.component';

describe('DoorGraphComponent', () => {
  let component: DoorGraphComponent;
  let fixture: ComponentFixture<DoorGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoorGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoorGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
