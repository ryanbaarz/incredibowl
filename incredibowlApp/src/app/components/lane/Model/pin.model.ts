export class Pin {
  id;
  x;
  y;
  isDown = false;
  probabilities;


  constructor(id: string, x: number, y: number, probabilities: any) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.probabilities = probabilities;
  }

  bowlToPin (ballIn: number) {
    let rand = Math.floor(Math.random() * 10) + 1,
        retVal = 0;

    if (this.probabilities[ballIn] >= rand && !this.isDown) {
      this.isDown = true;
      retVal = 1;
    }
    return retVal;
  }
}
