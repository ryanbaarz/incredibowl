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

  ngAfterViewInit() {
    this.animateBall( $('.bowling-ball') , this.ballSpeed);
  }

  animateBall(targetElement, speed) {
    let self = this;
    targetElement.animate({ marginLeft: '+=' + self.ballWidth + 'px'},
      {
        duration: speed,
        complete: function ()
        {
          targetElement.animate({ marginLeft: '-=' + self.ballWidth + 'px' },
            {
              duration: speed,
              complete: function ()
              {
                self.animateBall(targetElement, speed);
              }
            });
        }
      });
  };

  generateRoll() {
    let randIn = this.getLuckyNumber(),
        pinsDown = this.lane.knockPinsDown(randIn),
        frameDone = this.scorebox.recordBowl(pinsDown);

    this.toggleClickToBowl(null);
    if (frameDone) {
      setTimeout(() => {
        this.lane.setPins();
      }, 1000); // give the user a chance to see the pins knocked down
    }
  }

  getLuckyNumber() {
    let seed = Number($('.bowling-ball').css('marginLeft').replace('px', '')),
        ratio = seed / this.ballWidth;
    return Math.ceil(ratio * 10);
  }

  toggleClickToBowl(event) {
    if (event) {
      event.stopPropagation();
    }

    this.showClickToBowl = !this.showClickToBowl;

  }
}

