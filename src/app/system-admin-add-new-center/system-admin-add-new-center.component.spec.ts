import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemAdminAddNewCenterComponent } from './system-admin-add-new-center.component';

describe('SystemAdminAddNewCenterComponent', () => {
  let component: SystemAdminAddNewCenterComponent;
  let fixture: ComponentFixture<SystemAdminAddNewCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemAdminAddNewCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemAdminAddNewCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
