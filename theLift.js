var theLift = function(queues, capacity) {
    const q = queues.slice();
    console.log({q, capacity})
    const result = [];
    let lift = [];

    let isGoingUp = true;
    let floor = 0;

    while (!q.every(queue => queue.length === 0) || lift.length !== 0) {
      console.log({floor})
        if ((q[floor].length !== 0 && isQueueGoingSameDirection(q[floor], floor, isGoingUp, q)) || lift.includes(floor)) {
          result.push(floor);
          console.log({result})

          lift = lift.filter(person => person !== floor);

          let i = 0;
          while (i < q[floor].length) {
            if (lift.length === capacity) {
              break;
            }

            if (isPersonEligible(q[floor][i], floor, isGoingUp, q)) {
              const person = q[floor].splice(i, 1);
              lift.push(...person);
            }
            else {
              i++;
            }
          }
        }

        let move = moveLift(floor, q.length - 1, isGoingUp);
        floor = move.floor;
        isGoingUp = move.isGoingUp;
    }

    if (result[0] !== 0) {
      result.unshift(0)
    }

    if (result[result.length - 1] !== 0) {
      result.push(0);
    }
    return result;
  }

  function isQueueGoingSameDirection (queue, currentFloor, isGoingUp, queues) {
    const isQueueGoingSameDirection = queue.some(person => isPersonEligible(person, currentFloor, isGoingUp, queues));
    return isQueueGoingSameDirection;
  }

  /**
  * Check if a person is eligible to enter the lift
  * @params {Integer} person
  * @params {Integer} currentFloor
  * @params {Boolean} isGoingUp
  * @params {Array<Array>} queues
  * @return {Boolean} true if eligible, false otherwise
  **/
  function isPersonEligible (person, currentFloor, isGoingUp, queues) {
    if (isGoingUp) {
      const highestCall = (queues.length - 1) - queues.slice().reverse().findIndex(queue => queue.length !== 0);
      return highestCall === currentFloor || person > currentFloor;;
    }
    else {
      const lowestCall = queues.findIndex(queue => queue.length !== 0);
      return lowestCall === currentFloor || person < currentFloor;
    }
  }

  /**
  * Move the lift up and down
  * @params {Integer} currentFloor
  * @params {Integer} maxFloor
  * @params {Boolean} isGoingUp
  * @return {Object} floor and direction of the lift
  **/
  function moveLift (currentFloor, maxFloor, isGoingUp) {
    const goingUp = {floor: currentFloor + 1, isGoingUp: true};
    const goingDown = {floor: currentFloor - 1, isGoingUp: false};

    if (isGoingUp) {
      return currentFloor === maxFloor ? goingDown : goingUp;
    } else {
      return currentFloor === 0 ? goingUp : goingDown;
    }
  }
