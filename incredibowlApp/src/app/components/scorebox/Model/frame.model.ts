export class Frame{
  id: string = "";
  score1: string = "";
  score2: string = "";
  runningTotal: number = null;

  constructor(id: string, score1: string, score2: string, runningTotal:number){
    this.id = id;
    this.score1 = score1;
    this.score2 = score2;
    this.runningTotal = runningTotal;
  }
}