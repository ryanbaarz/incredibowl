export class PinMap {
  /**
   * I pulled this out of thin air just my best guess the numbers 1-10 represent a ball position
   * 1 is left most 5 6 are center 10 is rightMost, the values for the keys are a probability
   * that the pin will be knocked down by ball in that position.
   * @returns Array
   */
  public static returnMap () {
    return [
      { // pin 1
        1 : 0,
        2 : 0,
        3 : 3,
        4 : 8,
        5 : 10,
        6 : 10,
        7 : 8,
        8 : 3,
        9 : 0,
        10 : 0
      },
      { // pin 2
        1 : 0,
        2 : 3,
        3 : 7,
        4 : 10,
        5 : 9,
        6 : 9,
        7 : 5,
        8 : 3,
        9 : 1,
        10 : 0
      }, { // pin 3
        1 : 0,
        2 : 1,
        3 : 3,
        4 : 5,
        5 : 9,
        6 : 9,
        7 : 10,
        8 : 7,
        9 : 3,
        10 : 0
      }, { // pin 4
        1 : 0,
        2 : 8,
        3 : 10,
        4 : 8,
        5 : 8,
        6 : 8,
        7 : 3,
        8 : 2,
        9 : 1,
        10 : 0
      }, { // pin 5
        1 : 0,
        2 : 2,
        3 : 5,
        4 : 7,
        5 : 9,
        6 : 9,
        7 : 7,
        8 : 5,
        9 : 2,
        10 : 0
      }, { // pin 6
        1 : 0,
        2 : 1,
        3 : 2,
        4 : 3,
        5 : 8,
        6 : 8,
        7 : 8,
        8 : 10,
        9 : 8,
        10 : 0
      }, { // pin 7
        1 : 0,
        2 : 10,
        3 : 8,
        4 : 5,
        5 : 7,
        6 : 7,
        7 : 4,
        8 : 3,
        9 : 1,
        10 : 0
      }, { // pin 8
        1 : 0,
        2 : 7,
        3 : 9,
        4 : 7,
        5 : 8,
        6 : 8,
        7 : 5,
        8 : 3,
        9 : 1,
        10 : 0
      }, { // pin 9
        1 : 0,
        2 : 1,
        3 : 3,
        4 : 5,
        5 : 8,
        6 : 8,
        7 : 7,
        8 : 9,
        9 : 7,
        10 : 0
      }, { // pin 10
        1 : 0,
        2 : 1,
        3 : 3,
        4 : 4,
        5 : 7,
        6 : 7,
        7 : 5,
        8 : 8,
        9 : 10,
        10 : 0
      }
    ];
  }
}
