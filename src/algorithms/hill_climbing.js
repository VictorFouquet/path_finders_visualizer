import PathFindersVisualizer from "../PathFindersVisualizer/PathFindersVisualizer";
import { heapSort } from "../algorithms/heap_sort";
import { isInside } from "../algorithms/is_inside";

export function hillClimbing(grid, startNode, finishNode){
    var visited = [];
    var stack = []; 
    var paths = [];
    const l = grid.length - 1;
    const L = grid[0].length - 1;
    var node = "";
    visited[startNode.row + ", " + startNode.col] = true;
    stack.unshift(startNode);
    while (node.row + "," + node.col != finishNode.row + "," + finishNode.col) {
        node = stack.shift();
        if (!node) {
            return false;
        } else if (node.row === finishNode.row && node.col === finishNode.col) {
            return paths;
        }
        var x = node.row;
        var y = node.col;
        var neighbors = isInside(x, y, l, L, grid);
        var weightedNeighbors = [];

        for (var neighbor of neighbors) {
            if (!grid[neighbor[0]][neighbor[1]].isWall) {
                if (!visited[neighbor[0] + ", " + neighbor[1]]) {
                    weightedNeighbors.push(
                        {   row: neighbor[0], 
                            col: neighbor[1], 
                            parent: node,
                            weight: (finishNode.row-neighbor[0])**2 + (finishNode.col-neighbor[1])**2
                        });
                    visited[neighbor[0] + ", " + neighbor[1]] = true;
                }
            }
        }
        heapSort(weightedNeighbors);
        stack.unshift(...weightedNeighbors);
        paths.push(...weightedNeighbors);
        visited[neighbor.row + ", " + neighbor.col] = true;
    }
}