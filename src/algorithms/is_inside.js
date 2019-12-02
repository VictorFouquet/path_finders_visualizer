import PathFindersVisualizer from "../PathFindersVisualizer/PathFindersVisualizer";

export function isInside(x, y, l, L) {
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