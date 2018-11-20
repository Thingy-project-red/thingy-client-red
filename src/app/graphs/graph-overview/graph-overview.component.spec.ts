import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphOverviewComponent } from './graph-overview.component';

describe('GraphOverviewComponent', () => {
  let component: GraphOverviewComponent;
  let fixture: ComponentFixture<GraphOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
