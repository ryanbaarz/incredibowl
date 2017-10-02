import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ScoreboxComponent } from './components/scorebox/scorebox.component';
import { LaneComponent } from './components/lane/lane.component';

import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild(ScoreboxComponent)
  scorebox: ScoreboxComponent;

  @ViewChild(LaneComponent)
  lane: LaneComponent;

  showClickToBowl = true;
  ballWidth = 320;
  ballSpeed = 1000;

  constructor() {

  }

  /**
   * Not Ideal to use Jquery inside of angular but it was a quick way to get animation of
   * the ball going back and forth that I was familiar with.
   */
  ngAfterViewInit() {
    this.animateBall( $('.bowling-ball') , this.ballSpeed);
  }

  /**
   * Animate ball takes a target Element that should be a JQuery Object and  the duration
   * of the animation one way, so the higher the duration the slower it goes.
   * It will go back and forth moving the distance in pixels of the ballWidth
   * @param targetElement
   * @param duration
   */
  animateBall(targetElement, duration) {
    let self = this;
    targetElement.animate({ marginLeft: '+=' + self.ballWidth + 'px'},
      {
        duration: duration,
        complete: function ()
        {
          targetElement.animate({ marginLeft: '-=' + self.ballWidth + 'px' },
            {
              duration: duration,
              complete: function ()
              {
                self.animateBall(targetElement, duration);
              }
            });
        }
      });
  };

  /**
   * Uses the position of the bowling ball to get a number between 1 and 10
   * Then it uses that number as a seed to get the knocked Down pins from the Lane
   * The lane returns how many pins have been knocked down and that is sent to the scorebox
   * The score box lets us know if the pins need to be reset based on information in the frame.
   */
  generateRoll() {
    let randIn = this.getLuckyNumber(),
        pinsDown = this.lane.knockPinsDown(randIn),
        resetPins = this.scorebox.recordBowl(pinsDown);

    this.toggleClickToBowl(null);
    if (resetPins) {
      setTimeout(() => {
        this.lane.setPins();
      }, 1000); // give the user a chance to see the pins knocked down
    }
  }

  /**
   * returns a number between 1 and 10 based on where the ball is when the ball container is clicked
   * It signifies the horizontal position of the ball when bowled.
   * @returns {number}
   */
  getLuckyNumber() {
    let seed = Number($('.bowling-ball').css('marginLeft').replace('px', '')),
        ratio = seed / this.ballWidth;
    return Math.ceil(ratio * 10);
  }

  /**
   * Shows the Click to Bowl button which is also a mask for the ball controller.
   * @param event
   */
  toggleClickToBowl(event) {
    if (event) {
      event.stopPropagation();
    }

    this.showClickToBowl = !this.showClickToBowl;

  }
}

