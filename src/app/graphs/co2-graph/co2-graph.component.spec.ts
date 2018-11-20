import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Co2GraphComponent } from './co2-graph.component';

describe('Co2GraphComponent', () => {
  let component: Co2GraphComponent;
  let fixture: ComponentFixture<Co2GraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Co2GraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Co2GraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
