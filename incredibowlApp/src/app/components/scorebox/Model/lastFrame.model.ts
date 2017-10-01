import {Frame} from "./frame.model";

export class LastFrame extends Frame{
  score3: string = "";
  constructor(id: string, score1: string, score2: string, score3: string,runningTotal:number){
    super(id, score1, score2,runningTotal);
    this.score3 = score3;
  }
}
