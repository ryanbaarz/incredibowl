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

  /**
   * based on which scores have already been recorded on the frame we find out where to
   * record the pinsDown. It also updates the running total for the frame
   *
   * @param {number} pinsDown
   */
  addPinsToFrame(pinsDown: number) {
    // This block is to catch any situations where our total goes above 10 for some reason we will fake it in the players favor.
    if (this.frameTotal + pinsDown > 10) {
      pinsDown = 10 - this.frameTotal;
    }

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

  /**
   * returns the pretty value for the number of pins Rolled. It also discovers if a frame
   * has had a X or / and should get extra balls on the frame.
   *
   * @param {number} pins
   * @param {boolean} canBeSpare
   * @returns {string}
   */

  getMark(pins: number, canBeSpare: boolean) {
    let retVal = pins + '';
    if (pins === 10 && this.score1 !== '-') {
      this.extraBalls = 2;
      retVal = 'X';
    }
    else if (canBeSpare && ((Number(this.score1) + pins) === 10 || pins === 10)) {
      this.extraBalls = 1;
      retVal = '/';
    }
    else if (pins === 0) {
      retVal = '-';
    }
    return retVal;
  }

  /**
   * returns weather or not the total should be shown in the case of X or / the frame should
   * be blank until extra points are added later.
   * @returns {boolean}
   */
  showTotal() {
    return (this.score2 !== 'X' && this.score2 !== '/');
  }
}
