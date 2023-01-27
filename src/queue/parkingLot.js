const Queue = require("../queue/queue");

/**
 * Implement a Parking Lot.
 *
 */
class ParkingLot {
  constructor(capacity, rate) {
    this.spaces = new Array(capacity).fill("vacant");
    this.rate = rate;
    this.revenue = 0;
    this.queue = new Queue();
  }

  /**
   * Returns the number of vacant parking spaces
   * @returns {Number}
   *  the total number of spaces where the value is "vacant".
   */

  get vacantSpaces() {
    return this.spaces.reduce(
      (sum, space, index) => sum + (space === "vacant" ? 1 : 0),
      0
    );
  }

  /**
   * As cars enter the parking lot, the license plate number is entered and the car is parked in the first vacant space.
   * If the lot is full, the car is added to the queue to be parked when a spot is available.
   *
   * @param licensePlateNumber
   *  the license plate number of the car entering
   */
  enter(licensePlateNumber) {
    // first check if lot has empty spaces
    if (this.vacantSpaces !== 0) {
      // loop through spaces and find the first empty slot, and put the license number where vacant was
      for (let i = 0, length = this.spaces.length; i < length; i++) {
        if (this.spaces[i] === "vacant") {
          this.spaces[i] = licensePlateNumber;
          break;
        }
      }
    } else {
      // when the vacant spaces = 0 (no free spaces, put them in queue)
      this.queue.enqueue(licensePlateNumber);
    }
  }

  /**
   * As a car leaves the parking lot, or the queue, the leave method is called with the license plate number of the car leaving.
   * @param licensePlateNumber
   *    *  the license plate number of the car leaving.
   */
  leave(licensePlateNumber) {
    // since cars can leave either from the lot, or the queue, will need to search up the license plate and find where it is
    // cars can also leave the queue, while in the middle of it. and i only have queue, and enqueue to use

    // check if license plate in parking lot
    let indexOfPlateInSpace = this.spaces.indexOf(licensePlateNumber);
    // console.log(`indexOfPlateInSpace is ${indexOfPlateInSpace}`)
    if (indexOfPlateInSpace !== -1) { //they are in the lot
      // mark space they left as vacant now
      this.spaces[indexOfPlateInSpace] = "vacant";

      // then i need to take the first car in queue (if it is not empty, and put it in that spot)
      // if queue is just empty. dont need to do anything
      if (this.queue.peek()) {
        let firstInQueue = this.queue.dequeue();
        console.log(
          `Car: ${licensePlateNumber} has left the lot, and next in queue is ${firstInQueue}`
        );
        this.enter(firstInQueue);
      }
      this.revenue += this.rate
    } else {
      // so when indexOfPlateInSpace = -1 (aka it is not in lot, lets check if it is in queue)
      let currentNode = this.queue.first;
      let foundCar = false;
      // I need to loop through the queue to find if the leaving car is in queue...but later I will have to loop again through it to reorder it, but I cant realllly do them at the same time since what happens if the car leaving isnt in lot or queue, but is an error
      while (currentNode) {
        if (currentNode.value === licensePlateNumber) {
          foundCar = true;
          break;
        }
        currentNode = currentNode.next;
      }

      console.log(
        `Was a car found in queue? ${foundCar} for number ${licensePlateNumber}`
      );
      // when found car is false, not in system log an error and return null
      if (!foundCar) {
        console.log(
          `A car with license plate: ${licensePlateNumber} is not in our system`
        );
        return null;
      } else {
        // if found car is true, it is in queue...and i get to remove it from queue and reorder the queue
        currentNode = this.queue.first;
        let temp = [];
        while (currentNode) {
          console.log(
            `CURRENT NODE VALUE ON WHILE LOOP IS : ${currentNode.value}`
          );
          if (currentNode.value !== licensePlateNumber) {
            let dequeue = this.queue.dequeue();
            temp.push(dequeue);
            currentNode = currentNode.next;
          } else {
            // if value does equal the license plate leaving. We do dequeu, and that is the car leaving
            let carLeaving = this.queue.dequeue();
            currentNode = currentNode.next;
          }
        }

        // while loop ends once it went through the whole list, only removing the car leaving, now we go through the temp array backwards, and requeue them all
        console.log(`Temp array has: ${temp}`);
        // console.log(temp.length)
        for (let i = 0; i < temp.length; i++) {
          console.log(`Queueing ${temp[i]}`);
          this.queue.enqueue(temp[i]);
        }
      }
    }
  }

  /**
   * Lists each space in the parking lot along with the license plate number of the car parked there, or
   * "vacant" as the license plate if the spot is vacant.
   * @returns {{licensePlateNumber: string, space: Number}[]}
   */
  get occupants() {
    return this.spaces.map((licensePlateNumber, index) => ({
      space: index + 1,
      licensePlateNumber,
    }));
  }

  /**
   * The total cumulative revenue for the parking lot. The parking rate is paid when the car leaves, it does not matter how long the car stays in the spot.
   * @returns {number}
   *  the total revenue for the parking lot.
   */
  get totalRevenue() {
    return this.revenue;
  }
}

const testParkingLot = new ParkingLot(2, 5);

console.log(testParkingLot);

console.log(`Vacant spaces in lot are ${testParkingLot.vacantSpaces}`);

testParkingLot.enter("000000");
testParkingLot.enter("leaving:01");
testParkingLot.enter("000003");
testParkingLot.enter("111111");
testParkingLot.enter("leaving:02");
testParkingLot.enter("333333");

// leaving the lot
console.log(`~~~~~~~~~~~~~ Car leaving is leaving the lot ~~~~~~~~~~~~~`);
testParkingLot.leave("leaving:01");

console.log(testParkingLot);

// leaving the queue
console.log(`~~~~~~~~~~~~~ Car leaving:02 is leaving the queue ~~~~~~~~~~~~~`);
testParkingLot.leave("leaving:02");

console.log(testParkingLot);

// car not in lot or queue
// testParkingLot.leave("aaaaaaa")

module.exports = ParkingLot;
