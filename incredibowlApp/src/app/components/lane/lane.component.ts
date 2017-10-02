import { Component, OnInit } from '@angular/core';
import { Pin } from './Model/pin.model';
import { PinMap} from './pinMap';
import * as _ from 'lodash';

@Component({
  selector: 'app-lane',
  templateUrl: './lane.component.html',
  styleUrls: ['./lane.component.css']
})
export class LaneComponent implements OnInit {

  pins: Array<Pin>;
  startingY = 225;
  startingX = 125;
  pinWidth = 80;
  pinHeight = 60;
  pinRows = [2, 4, 7];
  constructor() { }

  ngOnInit() {
    this.setPins();
  }

  setPins() {
    let currentX = this.startingX,
        currentY = this.startingY,
        probabilities = PinMap.returnMap();

    this.pins = [];
    _.times(10, (n) => {
      let pinRowIndex = _.indexOf(this.pinRows, n + 1);
      if (pinRowIndex > -1) {// if it is a new Row
        currentY -= this.pinHeight;
        currentX = this.startingX - ((this.pinWidth / 2) * (pinRowIndex + 1));
      }
      else if (n !== 0) {
        currentX = currentX += this.pinWidth;
      }
      this.pins.push(new Pin('pin_ ' + (n + 1), currentX, currentY, probabilities[n]));

    });
  }

  /**
   * ballIn is a random Number between 1 and 10 that will influence how the pins are knocked down
   * @param {number} ballIn
   */
  knockPinsDown(ballIn: number) {
    let pinsDown = 0;
    _.each(this.pins, (pin) => {
      pinsDown += pin.bowlToPin(ballIn);
    });
    return pinsDown;
  }
}
