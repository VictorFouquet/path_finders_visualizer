import PathFindersVisualizer from "../PathFindersVisualizer/PathFindersVisualizer";

export function beam(grid, startNode, finishNode) {
    const begin = Date.now();
    const visited = [];
    const queue = [];
    const path = [];
    const l = grid.length - 1;
    const L = grid[0].length - 1;
    const total = l*L;
    const level = [];
    const levelWeights = [];
    var n = 0;
    var node = "";
    visited[startNode.row + ", " + startNode.col] = true;
    queue.push(startNode);

    while (node.row + "," + node.col != finishNode.row + "," + finishNode.col) {
        if (queue.length == 0) {
            if (level.length == 0) {
                return false;
            }
            let neighInd = levelWeights.indexOf(Math.min(...levelWeights));
            let neigh = level[neighInd];
            level.splice(neighInd, 1);
            levelWeights.splice(neighInd, 1);
            if (!grid[neigh.row][neigh.col].isWall) {
                queue.unshift(neigh);
            }
            if (levelWeights.length > 0) {
                neighInd = levelWeights.indexOf(Math.min(...levelWeights));
                neigh = level[neighInd];
                level.splice(neighInd, 1);
                levelWeights.splice(neighInd, 1);
                if (!grid[neigh.row][neigh.col].isWall) {
                    queue.push(neigh);
                }
            }

        }

        var node = queue.shift();
        var x = node.row;
        var y = node.col;
        var neighbors = isInside(x, y, l, L, grid);;
        
        for (var neighbor of neighbors) {
            if (!grid[neighbor[0]][neighbor[1]].isWall) {
                if (!visited[neighbor[0] + ", " + neighbor[1]]) {
                    console.log({ row: neighbor[0], col: neighbor[1], parent: node })
                    level.push({ row: neighbor[0], col: neighbor[1], parent: node });
                    levelWeights.push( (finishNode.row-neighbor[0])**2 + (finishNode.col-neighbor[1])**2 );
                    path.push({ row: neighbor[0], col: neighbor[1], parent: node });
                    visited[neighbor[0] + ", " + neighbor[1]] = true;
                }
            }
            if (neighbor[0] === finishNode.row && neighbor[1] === finishNode.col){
                return path;
            }
        }
        n++;
        if (n > total) {
            return path;
        }
    }
}

function isInside(x, y, l, L, grid) {
    const moves = [
      [x + 1, y],
      [x, y + 1],
      [x - 1, y],
      [x, y - 1]
    ];
    const legalMoves = [];
    for (var move of moves) {
      if (move[0] >= 0 && move[0] <= l && move[1] >= 0 && move[1] <= L) {
        console.log([move[0], move[1]])
        legalMoves.push([move[0], move[1]]);
      }
    }
    return legalMoves;
  }