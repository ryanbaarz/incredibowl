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

  /**
   * Generates a random number betwen 1 and 10 to introduce luck
   * that number is then compared to a map of probabilties that the pin will be knocked down
   * based on the horzontal position in. the higher the probability in the map the more liekely it
   * will be knocked down.
   *
   * @param {number} ballIn number between 1 and 10
   * @returns {number} 1 if the ball in caused the ball to be knocked down 0 if it is still standing.
   */
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
