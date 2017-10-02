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

  /**
   * creates an Array of 10 Frames where then final Frame is a LastFrame
   */
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
    /*
      this is a good little function for testing I can just click to run record bowl with a pinCount
      this.recordBowl (3);
     */

  }

  /**
   * Send the number of Pins down in and we will go through and add the pins to any frames that are still
   * awaiting extra pins because they were spares or strikes, Then we add the pins to Frame that is currently
   * being played. From that interaction the Frame will know weather or not the Frame is done or if it needs to
   * reset the pins like in the last frame when you mark on ball 1 or 2.
   *
   * It returns weather or not the pins should be reset.
   *
   * If the frame is done it advances the scorebox to the next frame.
   * @param {number} pinsDown
   * @returns {boolean}
   */
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

  /**
   * Goes through each of the frames searching for frames that are awaiting extra points because
   * the frame had a strike or a spare. Adds extra points and if there are no more extra points to
   * wait for it displays the running score.
   * @param {number} pinsDown
   */
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
