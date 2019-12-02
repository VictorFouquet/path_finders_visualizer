import PathFindersVisualizer from "../PathFindersVisualizer/PathFindersVisualizer";
import { heapSort } from "../algorithms/heap_sort";
import { isInside } from "../algorithms/is_inside";

export function bestFirst(grid, startNode, finishNode) {
    const visited = [];
    const stack = []; 
    const path = [];
    const l = grid.length - 1;
    const L = grid[0].length - 1;
    var node = "";
    visited[startNode.row + ", " + startNode.col] = true;
    stack.unshift({
        row: startNode.row, 
        col: startNode.col, 
        parent: node,
        weight: (finishNode.row-startNode.row)**2 + (finishNode.col-startNode.col)**2
    });

    while (node.row + "," + node.col != finishNode.row + "," + finishNode.col) {
        heapSort(stack);
        node = stack.shift();

        if (!node) {
            return false;
        } else if (node.row === finishNode.row && node.col === finishNode.col) {
            return path;
        }

        var x = node.row;
        var y = node.col;
        var neighbors = isInside(x, y, l, L, grid);

        for (var neighbor of neighbors) {
            if (!grid[neighbor[0]][neighbor[1]].isWall) {
                if (!visited[neighbor[0] + ", " + neighbor[1]]) {
                    stack.unshift({ 
                            row: neighbor[0], 
                            col: neighbor[1], 
                            parent: node,
                            weight: (finishNode.row-neighbor[0])**2 + (finishNode.col-neighbor[1])**2
                    });
                    path.push({ row: neighbor[0], col: neighbor[1], parent: node });
                    visited[neighbor[0] + ", " + neighbor[1]] = true;
                }
            }     
        }
    }
}