import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventFlow } from './event-flow';

describe('EventFlow', () => {
  let component: EventFlow;
  let fixture: ComponentFixture<EventFlow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventFlow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventFlow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
