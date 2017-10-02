import { Component, ViewChild } from '@angular/core';
import { ScoreboxComponent } from './components/scorebox/scorebox.component';
import { LaneComponent } from './components/lane/lane.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(ScoreboxComponent)
  scorebox: ScoreboxComponent;

  @ViewChild(LaneComponent)
  lane: LaneComponent;

  constructor() {

  }

  generateRoll() {
    let randIn = Math.floor(Math.random() * 10) + 1,
        pinsDown = this.lane.knockPinsDown(randIn),
        frameDone = this.scorebox.recordBowl(pinsDown);
        if (frameDone) {
          setTimeout(() => {this.lane.setPins();}, 1000); // give the user a chance to see the pins knocked down

        }
  }
}

