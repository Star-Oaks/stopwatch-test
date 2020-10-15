import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopwatchContainerComponent } from './stopwatch-container.component';

describe('StopwatchContainerComponent', () => {
  let component: StopwatchContainerComponent;
  let fixture: ComponentFixture<StopwatchContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StopwatchContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StopwatchContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
