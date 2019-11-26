import PathFindersVisualizer from "../PathFindersVisualizer/PathFindersVisualizer";

export function bfs(grid, startNode, finishNode) {
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

function isInside(x, y, l, L) {
  const moves = [
    [x + 1, y],
    [x, y + 1],
    [x - 1, y],
    [x, y - 1]
  ];
  const legalMoves = [];
  for (var move of moves) {
    if (move[0] >= 0 && move[0] <= l && move[1] >= 0 && move[1] <= L) {
      legalMoves.push([move[0], move[1]]);
    }
  }
  return legalMoves;
}
