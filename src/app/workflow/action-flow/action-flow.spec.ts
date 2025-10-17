import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionFlow } from './action-flow';

describe('ActionFlow', () => {
  let component: ActionFlow;
  let fixture: ComponentFixture<ActionFlow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionFlow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionFlow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
