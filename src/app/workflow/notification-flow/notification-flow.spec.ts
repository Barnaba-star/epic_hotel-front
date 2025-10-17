import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationFlow } from './notification-flow';

describe('NotificationFlow', () => {
  let component: NotificationFlow;
  let fixture: ComponentFixture<NotificationFlow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationFlow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationFlow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
