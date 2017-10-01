import { Component, OnInit } from '@angular/core';
import {Frame} from './Model/frame.model';
import {LastFrame} from './Model/lastFrame.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-scorebox',
  templateUrl: './scorebox.component.html',
  styleUrls: ['./scorebox.component.css']
})
export class ScoreboxComponent implements OnInit {

  /*displayScores : Array<any >= [
    {
      id:"frame1",
      score1 : "",
      score2 : "X",
      runningTotal : 20
    },
    {
      id:"frame2",
      score1 : "7",
      score2 : "/",
      runningTotal : 39
    },
    {
      id:"frame3",
      score1 : "9",
      score2 : "-",
      runningTotal : 48
    },
    {
      id:"frame4",
      score1 : "",
      score2 : "X",
      runningTotal : 66
    },
    {
      id:"frame5",
      score1 : "-",
      score2 : "8",
      runningTotal : 74
    },
    {
      id:"frame6",
      score1 : "8",
      score2 : "/",
      runningTotal : 84
    },
    {
      id:"frame7",
      score1 : "-",
      score2 : "6",
      runningTotal : 90
    },
    {
      id:"frame8",
      score1 : "",
      score2 : "X",
      runningTotal : 120
    },
    {
      id:"frame9",
      score1 : "",
      score2 : "X",
      runningTotal : 148
    },
    {
      id:"frame10",
      score1 : "X",
      score2 : "8",
      score3 : "1",
      runningTotal : 167
    }
  ];*/

  displayScores: Array<any>;
  currentFrameIndex: number;
  currentScore: number;
  markMap: any = {
    'X' : 10,
    '/' : null,
    '-' : 0,
    '' : 0
  };

  constructor() { }

  ngOnInit() {
    this.initializeFrames();
    console.log(this.displayScores);
  }

  initializeFrames() {
    this.displayScores = [];
    this.currentScore = 0;
    _.times(9, (n) => {
      this.displayScores.push(
        new Frame('frame' + (n + 1) , '', '', null)
      );
    });
    this.displayScores.push(
      new LastFrame('frame10' , '', '', '', null)
    );

    this.currentFrameIndex = 0;
  }

  testClick() {
    this.recordBowl (10);
  }

  recordBowl(pinsDown: number) {
    if (this.currentFrameIndex > 9) {
      this.initializeFrames();
    }

    const currentFrame = this.displayScores[this.currentFrameIndex],
          isLastFrame = currentFrame.hasOwnProperty('score3');

    currentFrame.frameTotal += pinsDown;
    this.updatePendingFrames(pinsDown);

    if (_.isEmpty(currentFrame.score1) && pinsDown !== 10) {
      currentFrame.score1 = this.getMark(pinsDown, currentFrame, false); // convert pinsDown to string
    }
    else if (_.isEmpty(currentFrame.score2) && !isLastFrame) {
      currentFrame.score2 = this.getMark(pinsDown, currentFrame, true);
      if (!isLastFrame) { // if it is not the last frame go to the next one.
        this.currentFrameIndex += 1;
        this.calculateFrameScore(currentFrame);
      }
    }
    else if (isLastFrame) {
      this.recordLastFrame(pinsDown , currentFrame);
    }

  }

  getMark(pins: number, frame: any, canBeSpare: boolean) {
    let retVal = pins + '';
    if (pins === 10) {
      frame.extraBalls = 2;
      retVal = 'X';
    }
    else if (canBeSpare && (Number(frame.score1) + pins) === 10) {
      frame.extraBalls = 1;
      retVal = '/';
    }
    else if (pins === 0) {
      retVal = '-';
    }
    return retVal;
  }

  calculateFrameScore(currentFrame: any) {
    if ((currentFrame.score2 !== 'X' && currentFrame.score2 !== '/')) {
      this.currentScore += currentFrame.frameTotal;
      currentFrame.runningTotal = this.currentScore;
    }
  }

  updatePendingFrames(pinsDown: number) {
    _.each(this.displayScores, (frameIn) => {
      if (frameIn.extraBalls > 0) {
        frameIn.frameTotal += pinsDown;
      }

      frameIn.extraBalls -= 1;

      if (frameIn.extraBalls === 0 && !frameIn.hasOwnProperty('score3')) {// No extra Balls and Not the last frame.
        this.currentScore += frameIn.frameTotal;
        frameIn.runningTotal = this.currentScore;
      }
    });
  }

  recordLastFrame(pinsDown: number, currentFrame: any) {
    if (_.isEmpty(currentFrame.score1)) { // This is to catch the case where there is a strike on the first ball of the last strike.
      currentFrame.score1 = this.getMark(pinsDown, currentFrame, false);
    }
    else if (_.isEmpty(currentFrame.score2)) {
      currentFrame.score2 = this.getMark(pinsDown, currentFrame, true);
      if (currentFrame.score2 !== 'X' && currentFrame.score2 !== '/') {
        this.currentFrameIndex += 1;
        this.calculateLastFrame();
      }
    }
    else {
      currentFrame.score3 = this.getMark(pinsDown, currentFrame, false);
      this.currentFrameIndex += 1;
      this.calculateLastFrame();
    }
  }

  calculateLastFrame() {
    const lastFrame = this.displayScores[9];
    this.markMap['/'] = 10 - Number(lastFrame.score1);

    let total = 0;
    total += (_.isNumber(this.markMap[lastFrame.score1])) ? this.markMap[lastFrame.score1] : Number(lastFrame.score1);
    total += (_.isNumber(this.markMap[lastFrame.score2])) ? this.markMap[lastFrame.score2] : Number(lastFrame.score2);
    total += (_.isNumber(this.markMap[lastFrame.score3])) ? this.markMap[lastFrame.score3] : Number(lastFrame.score3);

    lastFrame.frameTotal = total;
    this.currentScore += lastFrame.frameTotal;
    lastFrame.runningTotal = this.currentScore;

  }

}
