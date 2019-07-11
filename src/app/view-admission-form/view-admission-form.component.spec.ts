import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAdmissionFormComponent } from './view-admission-form.component';

describe('ViewAdmissionFormComponent', () => {
  let component: ViewAdmissionFormComponent;
  let fixture: ComponentFixture<ViewAdmissionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAdmissionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAdmissionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
