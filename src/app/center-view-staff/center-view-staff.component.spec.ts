import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterViewStaffComponent } from './center-view-staff.component';

describe('CenterViewStaffComponent', () => {
  let component: CenterViewStaffComponent;
  let fixture: ComponentFixture<CenterViewStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CenterViewStaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterViewStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
