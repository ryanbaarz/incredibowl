/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BallControllerComponent } from './ball-controller.component';

describe('BallControllerComponent', () => {
  let component: BallControllerComponent;
  let fixture: ComponentFixture<BallControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BallControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BallControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
