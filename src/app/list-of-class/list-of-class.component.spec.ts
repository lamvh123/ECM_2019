import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfClassComponent } from './list-of-class.component';

describe('ListOfClassComponent', () => {
  let component: ListOfClassComponent;
  let fixture: ComponentFixture<ListOfClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
