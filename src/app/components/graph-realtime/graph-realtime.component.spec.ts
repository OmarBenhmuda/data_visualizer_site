import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphRealtimeComponent } from './graph-realtime.component';

describe('GraphRealtimeComponent', () => {
  let component: GraphRealtimeComponent;
  let fixture: ComponentFixture<GraphRealtimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphRealtimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphRealtimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
