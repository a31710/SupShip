/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PostReportComponent } from './post-report.component';

describe('PostReportComponent', () => {
  let component: PostReportComponent;
  let fixture: ComponentFixture<PostReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});