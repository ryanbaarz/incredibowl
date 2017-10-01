export class Frame {
  id = '';
  score1 = '';
  score2 = '';
  runningTotal: number = null;
  extraBalls;
  frameTotal: number;

  constructor(id: string, score1: string, score2: string, runningTotal: number) {
    this.id = id;
    this.score1 = score1;
    this.score2 = score2;
    this.runningTotal = runningTotal;
    this.extraBalls = 0;
    this.frameTotal = 0;
  }
}
