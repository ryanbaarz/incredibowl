import {Frame} from './frame.model';
import * as _ from 'lodash';


export class LastFrame extends Frame {
  score3 = '';
  isLastFrame = true;
  resetPins = false;

  constructor(id: string, score1: string, score2: string, score3: string, runningTotal: number) {
    super(id, score1, score2, runningTotal);
    this.score3 = score3;
  }

  /**
   * Overload the addPinsToFrame function from the Parent because he's  a little bit special
   * Since there can be 3 balls thrown in the last Frame and any ball can be a Mark, we have to be able to
   * record if a reset is needed. We set resetPins=false every time. Int the last frame it works out that every
   * ball just counts as its own score and does not get extra points so the frame total is just the total of
   * all 3 scores.
   * @param {number} pinsDown
   */
  addPinsToFrame(pinsDown: number) {
    this.frameTotal += pinsDown;
    this.resetPins = false;

    if (_.isEmpty(this.score1)) { // This is to catch the case where there is a strike on the first ball of the last frame.
      this.score1 = this.getMark(pinsDown, false);
      if (this.score1 === 'X') { // reset the pins for a strike on first ball
        this.resetPins = true;
      }
    }
    else if (_.isEmpty(this.score2)) {
      this.score2 = this.getMark(pinsDown,  true);
      // the frame is not done if we start with a strike or there is a mark int he second frame
      if (this.score1 !== 'X' && this.score2 !== 'X' && this.score2 !== '/') {
        this.frameDone = true;
      }
      else if (this.score2 === 'X' || this.score2 === '/') { // reset the pins on a mark for the 2nd score.
        this.resetPins = true;
      }
    }
    else {
      this.score3 = this.getMark(pinsDown, false);
      this.frameDone = true;
    }
  }

  /**
   * always show total on the last frame
   * @returns {boolean}
   */
  showTotal() {
    return true;
  }
}
