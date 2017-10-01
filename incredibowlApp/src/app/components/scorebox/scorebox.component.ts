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
  balls : Array<number>;

  constructor() { }

  ngOnInit() {
    this.initializeFrames();
    console.log(this.displayScores);
  }

  initializeFrames() {
    this.displayScores = [];
    this.balls = [];
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
    this.recordBowl (5);
  }

  recordBowl(pinsDown: number) {
    if (this.currentFrameIndex > 9) {
      this.initializeFrames();
    }
    const currentFrame = this.displayScores[this.currentFrameIndex];
    if (_.isEmpty(currentFrame.score1) && pinsDown !== 10) {
      currentFrame.score1 = pinsDown + ''; // convert pinsDown to string

    }
    else if (_.isEmpty(currentFrame.score2) && !currentFrame.hasOwnProperty('score3')) {
      currentFrame.score2 = this.getMark(pinsDown, 2, currentFrame);
      if (!currentFrame.hasOwnProperty('score3')) { // if it is not the last frame go to the next one.
        this.currentFrameIndex += 1;
      }
    }
    else if (currentFrame.hasOwnProperty('score3')) {
      if (_.isEmpty(currentFrame.score1)) { // This is to catch the case where there is a strike on the first ball of the last strike.
        currentFrame.score1 = this.getMark(pinsDown, 1, currentFrame);
      }
      else if (_.isEmpty(currentFrame.score2)) {
        currentFrame.score2 = this.getMark(pinsDown, 2, currentFrame);
        console.log(currentFrame.score2);
        if (currentFrame.score2 !== 'X' && currentFrame.score2 !== '/') {
          this.currentFrameIndex += 1;
        }
      }
      else {
        currentFrame.score3 = this.getMark(pinsDown, 3, currentFrame);
        this.currentFrameIndex += 1;
      }


    }
  }

  getMark(pins: number, scoreIndex: number, frame: any) {
    let retVal = pins + '';
    if (pins === 10) {
      retVal = 'X';
    }
    else if (scoreIndex === 2 && (Number(frame.score1) + pins) === 10) {
      retVal = '/';
    }
    return retVal;
  }

}
