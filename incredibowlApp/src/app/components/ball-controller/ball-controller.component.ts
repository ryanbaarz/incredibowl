import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ball-controller',
  templateUrl: './ball-controller.component.html',
  styleUrls: ['./ball-controller.component.css']
})
export class BallControllerComponent implements OnInit {
  latestBall = 0;

  constructor() { }

  ngOnInit() {
  }

  generateRoll() {
    this.latestBall = Math.random();
  }
}
