import * as _ from 'lodash';

export class Frame {
  id = '';
  score1 = '';
  score2 = '';
  runningTotal: number = null;
  extraBalls = 0;
  frameTotal = 0;
  frameDone = false;
  isLastFrame = false;


  constructor(id: string, score1: string, score2: string, runningTotal: number) {
    this.id = id;
    this.score1 = score1;
    this.score2 = score2;
    this.runningTotal = runningTotal;
  }

  addPinsToFrame(pinsDown: number) {
    this.frameTotal += pinsDown;

    if (_.isEmpty(this.score1) && pinsDown !== 10) {
      this.score1 = this.getMark(pinsDown, false); // convert pinsDown to string
    }
    else if (_.isEmpty(this.score2)) {
      this.score2 = this.getMark(pinsDown, true);
      if (!this.isLastFrame) { // if it is not the last frame go to the next one.
        this.frameDone = true;
      }
    }
  }

  getMark(pins: number, canBeSpare: boolean) {
    let retVal = pins + '';
    if (pins === 10) {
      this.extraBalls = 2;
      retVal = 'X';
    }
    else if (canBeSpare && (Number(this.score1) + pins) === 10) {
      this.extraBalls = 1;
      retVal = '/';
    }
    else if (pins === 0) {
      retVal = '-';
    }
    return retVal;
  }

  showTotal() {
    return (this.score2 !== 'X' && this.score2 !== '/');
  }
}
