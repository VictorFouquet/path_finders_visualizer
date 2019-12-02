import PathFindersVisualizer from "../PathFindersVisualizer/PathFindersVisualizer";
import { heapSort } from "../algorithms/heap_sort";
import { isInside } from "../algorithms/is_inside";

export function beam(grid, startNode, finishNode) {
    const begin = Date.now();
    const visited = [];
    const queue = [];
    const path = [];
    const l = grid.length - 1;
    const L = grid[0].length - 1;
    const total = l*L;
    const level = [];
    var n = 0;
    var node = "";
    visited[startNode.row + ", " + startNode.col] = true;
    queue.push(startNode);
    console.log(begin)
    
    while (node.row + "," + node.col != finishNode.row + "," + finishNode.col) {
        if (queue.length == 0) {
            if (level.length == 0) {
                return false;
            }
            heapSort(level);
            let neigh = level.shift();
            if (!grid[neigh.row][neigh.col].isWall) {
                queue.push(neigh);
            }
            if (level.length > 0) {
                let neigh = level.shift();
                if (!grid[neigh.row][neigh.col].isWall) {
                    queue.push(neigh);
                }
            }
        }

        var node = queue.shift();
        var x = node.row;
        var y = node.col;
        var neighbors = isInside(x, y, l, L, grid);
        
        for (var neighbor of neighbors) {
            if (!grid[neighbor[0]][neighbor[1]].isWall) {
                if (!visited[neighbor[0] + ", " + neighbor[1]]) {
                    level.push({ row: neighbor[0], 
                        col: neighbor[1], 
                        parent: node,
                        weight: (finishNode.row-neighbor[0])**2 + (finishNode.col-neighbor[1])**2
                     });
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
            console.log(Date.now)
            return path;
        }
    }
}