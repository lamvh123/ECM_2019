import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterAdminMenubarComponent } from './center-admin-menubar.component';

describe('CenterAdminMenubarComponent', () => {
  let component: CenterAdminMenubarComponent;
  let fixture: ComponentFixture<CenterAdminMenubarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CenterAdminMenubarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterAdminMenubarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
