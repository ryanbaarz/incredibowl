/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LaneComponent } from './lane.component';

describe('LaneComponent', () => {
  let component: LaneComponent;
  let fixture: ComponentFixture<LaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
