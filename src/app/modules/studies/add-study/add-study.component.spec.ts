import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudyComponent } from './add-study.component';

describe('AddStudyComponent', () => {
  let component: AddStudyComponent;
  let fixture: ComponentFixture<AddStudyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddStudyComponent]
    });
    fixture = TestBed.createComponent(AddStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
