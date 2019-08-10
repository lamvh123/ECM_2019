import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemAdminGrantAccountComponent } from './system-admin-grant-account.component';

describe('SystemAdminGrantAccountComponent', () => {
  let component: SystemAdminGrantAccountComponent;
  let fixture: ComponentFixture<SystemAdminGrantAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemAdminGrantAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemAdminGrantAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
