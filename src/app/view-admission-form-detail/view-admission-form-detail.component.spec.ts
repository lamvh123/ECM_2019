import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAdmissionFormDetailComponent } from './view-admission-form-detail.component';

describe('ViewAdmissionFormDetailComponent', () => {
  let component: ViewAdmissionFormDetailComponent;
  let fixture: ComponentFixture<ViewAdmissionFormDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAdmissionFormDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAdmissionFormDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
