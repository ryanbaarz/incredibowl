import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ScoreboxComponent } from './components/scorebox/scorebox.component';
import {BallControllerComponent} from './components/ball-controller/ball-controller.component';
import {LaneComponent} from './components/lane/lane.component';

@NgModule({
  declarations: [
    AppComponent,
    ScoreboxComponent,
    BallControllerComponent,
    LaneComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
