import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemAdminMenuBarComponent } from './system-admin-menu-bar.component';

describe('SystemAdminMenuBarComponent', () => {
  let component: SystemAdminMenuBarComponent;
  let fixture: ComponentFixture<SystemAdminMenuBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemAdminMenuBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemAdminMenuBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
