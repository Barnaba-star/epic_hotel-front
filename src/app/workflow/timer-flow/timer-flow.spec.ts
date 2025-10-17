import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerFlow } from './timer-flow';

describe('TimerFlow', () => {
  let component: TimerFlow;
  let fixture: ComponentFixture<TimerFlow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimerFlow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimerFlow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
