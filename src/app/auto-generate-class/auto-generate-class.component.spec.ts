import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoGenerateClassComponent } from './auto-generate-class.component';

describe('AutoGenerateClassComponent', () => {
  let component: AutoGenerateClassComponent;
  let fixture: ComponentFixture<AutoGenerateClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoGenerateClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoGenerateClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
