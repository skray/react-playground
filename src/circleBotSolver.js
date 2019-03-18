import cloneDeep from 'lodash.clonedeep';

const gridSize = 21;
const origin = {x: Math.floor(gridSize/2), y: Math.floor(gridSize/2)};

export function createBoxes() {
  let boxes = [];

  for(let i = 0; i < gridSize; i++) {
    boxes.push([]);
    for(let j=0; j < gridSize; j++) {
      boxes[i].push({});
    }
  }

  boxes[origin.x][origin.y].isCenter = true;
  boxes[origin.x][origin.y].isRobot = true;

  return boxes;
}

export function solve(command) {

  let returnsToOrigin = false;
  let runs = [];
  let position = {x: 0, y: 0};
  let direction = {x: 0, y: 1};
  let actions = command.split('');


  // Possible reduction
  // remove canceling L/Rs between Gs
  // one more R than L (or vice versa) will always return to origin (after 4 runs?)
  while(Math.abs(position.x) + Math.abs(position.y) < actions.length * 2) {
    let run = [];

    for(let action of actions) {
      switch(action) {
        case 'G':
          position.x = position.x + direction.x;
          position.y = position.y + direction.y;
          run.push({x: position.x, y: position.y});
          break;
        case 'R':
          if(direction.y === 1) {
            direction.y = 0;
            direction.x = 1;
          } else if(direction.x === 1) {
            direction.x = 0;
            direction.y = -1;
          } else if(direction.y === -1) {
            direction.x = -1;
            direction.y = 0;
          } else {
            direction.x = 0;
            direction.y = 1;
          }
          break;
        case 'L':
          if(direction.y === 1) {
            direction.y = 0;
            direction.x = -1;
          } else if(direction.x === -1) {
            direction.x = 0;
            direction.y = -1;
          } else if(direction.y === -1) {
            direction.x = 1;
            direction.y = 0;
          } else {
            direction.x = 0;
            direction.y = 1;
          }
          break;
        default:
          break;
      }
    }
    runs.push(run);
    if(position.x === 0 && position.y === 0) {
      returnsToOrigin = true;
      break;
    }
  }

  let boxStates = [];
  let boxes = createBoxes();
  let lastPosition = {x: origin.x, y: origin.y};
  boxStates.push(cloneDeep(boxes));

  for(let i = 0; i < runs.length; i++) {
    let run = runs[i];
    for(let step of run) {
      if(
        origin.y - step.y >= 0 && origin.y - step.y < gridSize &&
        step.x + origin.x >= 0 && step.x + origin.x < gridSize
      ) {

        if (i % 2) {
          boxes[origin.y - step.y][step.x + origin.x].visitedEven = true;
        } else {
          boxes[origin.y - step.y][step.x + origin.x].visitedOdd = true;
        }
        boxes[origin.y - step.y][step.x + origin.x].isRobot = true;
        boxes[lastPosition.y][lastPosition.x].isRobot = false;
        lastPosition.x = step.x + origin.x;
        lastPosition.y = origin.y - step.y;
        boxStates.push(cloneDeep(boxes));
      }
    }
  }

  return {returnsToOrigin, runs, boxStates};
}