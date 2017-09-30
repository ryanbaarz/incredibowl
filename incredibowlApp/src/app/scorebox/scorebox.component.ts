import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scorebox',
  templateUrl: './scorebox.component.html',
  styleUrls: ['./scorebox.component.css']
})
export class ScoreboxComponent implements OnInit {

  displayScores : Array<any >= [
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
  ];
  constructor() { }

  ngOnInit() {
  }


}
