import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSlotComponent } from './view-slot.component';

describe('ViewSlotComponent', () => {
  let component: ViewSlotComponent;
  let fixture: ComponentFixture<ViewSlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
