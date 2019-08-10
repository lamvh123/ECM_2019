import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemAdminGetAllCenterComponent } from './system-admin-get-all-center.component';

describe('SystemAdminGetAllCenterComponent', () => {
  let component: SystemAdminGetAllCenterComponent;
  let fixture: ComponentFixture<SystemAdminGetAllCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemAdminGetAllCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemAdminGetAllCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
