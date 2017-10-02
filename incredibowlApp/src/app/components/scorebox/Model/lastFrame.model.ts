import {Frame} from './frame.model';
import * as _ from 'lodash';


export class LastFrame extends Frame {
  score3 = '';
  isLastFrame = true;

  constructor(id: string, score1: string, score2: string, score3: string, runningTotal: number) {
    super(id, score1, score2, runningTotal);
    this.score3 = score3;
  }

  addPinsToFrame(pinsDown: number) {
    this.frameTotal += pinsDown;

    if (_.isEmpty(this.score1)) { // This is to catch the case where there is a strike on the first ball of the last frame.
      this.score1 = this.getMark(pinsDown, false);
    }
    else if (_.isEmpty(this.score2)) {
      this.score2 = this.getMark(pinsDown,  true);
      if (this.score1 !== 'X' && this.score2 !== 'X' && this.score2 !== '/') {
        this.frameDone = true;
      }
    }
    else {
      this.score3 = this.getMark(pinsDown, false);
      this.frameDone = true;
    }
  }

  showTotal() {
    return true;
  }
}
