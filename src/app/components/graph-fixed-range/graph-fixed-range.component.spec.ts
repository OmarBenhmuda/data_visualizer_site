import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphFixedRangeComponent } from './graph-fixed-range.component';

describe('GraphFixedRangeComponent', () => {
  let component: GraphFixedRangeComponent;
  let fixture: ComponentFixture<GraphFixedRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphFixedRangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphFixedRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
