import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingMenuBarComponent } from './accounting-menu-bar.component';

describe('AccountingMenuBarComponent', () => {
  let component: AccountingMenuBarComponent;
  let fixture: ComponentFixture<AccountingMenuBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountingMenuBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingMenuBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
