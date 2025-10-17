import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErroFlow } from './erro-flow';

describe('ErroFlow', () => {
  let component: ErroFlow;
  let fixture: ComponentFixture<ErroFlow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErroFlow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErroFlow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
