import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterAdminGrantAccountComponent } from './center-admin-grant-account.component';

describe('CenterAdminGrantAccountComponent', () => {
  let component: CenterAdminGrantAccountComponent;
  let fixture: ComponentFixture<CenterAdminGrantAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CenterAdminGrantAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterAdminGrantAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
