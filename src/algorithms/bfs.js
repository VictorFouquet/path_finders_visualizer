import PathFindersVisualizer from "../PathFindersVisualizer/PathFindersVisualizer";
import { isInside } from "../algorithms/is_inside";

export function bfs(grid, startNode, finishNode) {
  const begin = Date.now();
  const visited = [];
  const queue = [];
  const path = [];
  const l = grid.length - 1;
  const L = grid[0].length - 1;

  visited[startNode.row + ", " + startNode.col] = true;
  queue.push(startNode);
  while (queue.length > 0) {
    var node = queue.shift();
    var x = node.row;
    var y = node.col;
    var neighbors = isInside(x, y, l, L);
    for (var neighbor of neighbors) {
      if (!visited[neighbor[0] + ", " + neighbor[1]]) {
        if (!grid[neighbor[0]][neighbor[1]].isWall) {
          queue.push({ row: neighbor[0], col: neighbor[1], parent: node });
          path.push({ row: neighbor[0], col: neighbor[1], parent: node });
          visited[neighbor[0] + ", " + neighbor[1]] = true;
        }
      }
      if (neighbor[0] === finishNode.row && neighbor[1] === finishNode.col) {
        return path;
      }
    }
  }
  return false;
}

