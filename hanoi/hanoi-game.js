class HanoiGame {
  constructor(towers) {
    // handles default value of towers if nothing is passed in
    if (towers !== undefined) {
      this.towers = towers;
    } else {
      this.towers = [[3, 2, 1], [], []];
    }
  }

  isValidMove(startTowerIdx, endTowerIdx) {
    let starting = this.towers[startTowerIdx];
    let ending = this.towers[endTowerIdx];

    if (startTowerIdx > 2 || endTowerIdx > 2) {
      return false;
    }

    if (startTowerIdx == endTowerIdx) {
      return false;
    }

    if (starting.length === 0) {
      return false;
    }
    if (ending.length === 0) {
      return true;
    }

    if (starting[starting.length - 1]
      < ending[ending.length - 1]) {
      return true;
    }

    if (starting[starting.length - 1] > ending[ending.length - 1]) {
      return false;
    }

  }

  move(startTowerIdx, endTowerIdx) {
      let movingDisk = "";
    if (this.isValidMove(startTowerIdx, endTowerIdx)){
        movingDisk = this.towers[startTowerIdx].pop();
        this.towers[endTowerIdx].push(movingDisk);
        return true;
    }
    return false;
  }

  isWon() {
      if (this.towers[1].length === 3 || this.towers[2].length === 3) {
          return true;
      }
      return false;
  }

  // the below methods are complete and do not need to be modified
  print() {
    // will print our board nicely to our user
    console.log(JSON.stringify(this.towers));
  }

  promptMove(reader, callback) {
    this.print();
    reader.question("Enter a starting tower: ", start => {
      const startTowerIdx = parseInt(start);
      reader.question("Enter an ending tower: ", end => {
        const endTowerIdx = parseInt(end);
        callback(startTowerIdx, endTowerIdx);
      });
    });
  }

  run(reader, callback) {
    // we will prompt our user to provide a start and stop index using
    // a readline interface
    this.promptMove(reader, (startTowerIdx, endTowerIdx) => {
      // if the move is invalid we tell the user
      if (!this.move(startTowerIdx, endTowerIdx)) {
        console.log("Invalid move!");
      }

      if (!this.isWon()) {
        // Continue to play!
        this.run(reader, callback);
      } else {
        this.print();
        console.log("You win!");
        callback();
      }
    });
  }
}

module.exports = HanoiGame;
