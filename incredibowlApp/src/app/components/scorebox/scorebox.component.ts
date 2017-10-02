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

  frames: Array<any>;
  currentFrameIndex: number;
  currentScore: number;

  constructor() { }

  ngOnInit() {
    this.currentScore = 0;
    this.currentFrameIndex = 0;
    this.initializeFrames();
  }

  initializeFrames() {
    this.frames = [];
    _.times(9, (n) => {
      this.frames.push(
        new Frame('frame' + (n + 1) , '', '', null)
      );
    });
    this.frames.push(
      new LastFrame('frame10' , '', '', '', null)
    );
  }

  testClick() {
    this.recordBowl (3);
    this.recordBowl (3);
    this.recordBowl (10);
  }

  recordBowl(pinsDown: number) {
    if (this.currentFrameIndex > 9) {
      this.ngOnInit();
    }

    this.updatePendingFrames(pinsDown);

    let currentFrame = this.frames[this.currentFrameIndex];

    currentFrame.addPinsToFrame(pinsDown);

    if (currentFrame.frameDone) {
      this.currentFrameIndex += 1;
      if (currentFrame.showTotal()) {
        this.currentScore += currentFrame.frameTotal;
        currentFrame.runningTotal = this.currentScore;
      }
    }

    return (currentFrame.frameDone || currentFrame.resetPins);
  }

  updatePendingFrames(pinsDown: number) {
    _.each(this.frames, (frameIn) => {
      if (!frameIn.isLastFrame) {
        if (frameIn.extraBalls > 0) {
          frameIn.frameTotal += pinsDown;
        }

        frameIn.extraBalls -= 1;

        if (frameIn.extraBalls === 0) {// No extra Balls and Not the last frame.
          this.currentScore += frameIn.frameTotal;
          frameIn.runningTotal = this.currentScore;
        }
      }
    });
  }
}
