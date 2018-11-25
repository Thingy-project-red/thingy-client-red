import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TvocGraphComponent } from './tvoc-graph.component';

describe('TvocGraphComponent', () => {
  let component: TvocGraphComponent;
  let fixture: ComponentFixture<TvocGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TvocGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TvocGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
