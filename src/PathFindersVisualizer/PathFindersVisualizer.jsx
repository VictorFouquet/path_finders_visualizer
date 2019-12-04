import React, { Component } from "react";
import Node from "./Node/Node";
import Stat from "./Stat/Stat";
import Description from "./Description/Description";
import { bfs } from "../algorithms/bfs";
import { dfs} from "../algorithms/dfs";
import { beam } from "../algorithms/beam";
import { hillClimbing } from "../algorithms/hill_climbing";
import { bestFirst } from "../algorithms/best_first";

import "./PathFindersVisualizer.css";

var START_NODE_ROW = 18;
var START_NODE_COL = 24;
var FINISH_NODE_ROW = 34;
var FINISH_NODE_COL = 45;
var anim_short = true;
var animating = false;
export default class PathFindersVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      mouseIsPressed: false
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });
  }

  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  animate(visitedNodesInOrder, ext, len, ratio){
    if (anim_short) {
      var speed = 5;
    } else {
      var speed = 2;
    }
    if (!visitedNodesInOrder) {
      for (let i = 0; i < 10; i++) {
        setTimeout(() =>{
          if (i % 2 === 0) {
            document.getElementById(`node-${START_NODE_ROW}-${START_NODE_COL}`).className = "node node-found"
          } else if (i === 9) {
            this.cleanWalls();
          } else {
            document.getElementById(`node-${START_NODE_ROW}-${START_NODE_COL}`).className = "node node-finish"
          }
        }, i*20);
      }
      animating = false;
      
    } else {
      document.getElementById(len).textContent = "Path length : 0";
      document.getElementById(ratio).textContent = "Path finding cost : 0.00";
      for (let i = 0; i < visitedNodesInOrder.length; i++) {
        setTimeout(() => {
          document.getElementById(ext).textContent = "Number of extensions : " + i;
          var node = visitedNodesInOrder[i];
          console.log(node);
          console.log(document.getElementById(`node-${node.row}-${node.col}`))
          document.getElementById(`node-${node.row}-${node.col}`).className = "node node-visited";
          if (node.row === FINISH_NODE_ROW && node.col === FINISH_NODE_COL) {
            const shortestPath = [];
            var current = visitedNodesInOrder[visitedNodesInOrder.length-1].parent;
            while (current.row != START_NODE_ROW || current.col != START_NODE_COL) {
              shortestPath.push(current);
              current = current.parent;
            }
            for (let i = 0; i < shortestPath.length; i++) {
              setTimeout(() => {
                document.getElementById(len).textContent = "Path length : " + i;
                var node = shortestPath[i];
                document.getElementById(`node-${node.row}-${node.col}`).className += "node node-path";
              }, i*20)
              
            }
            setTimeout(() => {
              document.getElementById(ratio).textContent = "Path finding cost : " + ((visitedNodesInOrder.length + shortestPath.length)/2).toFixed(2);
              animating = false;
            }, shortestPath.length*20);
            document.getElementById(`node-${node.row}-${node.col}`).className = "node node-found";
          }
        }, i*speed)
      }
    }
  } 

  generateMaze(){
    if (!animating) {
      document.getElementById('bfs-length').textContent = "Path length : 0";
      document.getElementById('bfs-ratio').textContent = "Path finding cost : 0.00";
      document.getElementById('bfs-ext').textContent = "Number of extensions : 0";
      document.getElementById('dfs-length').textContent = "Path length : 0";
      document.getElementById('dfs-ratio').textContent = "Path finding cost : 0.00";
      document.getElementById('dfs-ext').textContent = "Number of extensions : 0";
      document.getElementById('hc-length').textContent = "Path length : 0";
      document.getElementById('hc-ratio').textContent = "Path finding cost : 0.00";
      document.getElementById('hc-ext').textContent = "Number of extensions : 0";
      document.getElementById('beam-length').textContent = "Path length : 0";
      document.getElementById('beam-ratio').textContent = "Path finding cost : 0.00";
      document.getElementById('beam-ext').textContent = "Number of extensions : 0";
      document.getElementById('best-length').textContent = "Path length : 0";
      document.getElementById('best-ratio').textContent = "Path finding cost : 0.00";
      document.getElementById('best-ext').textContent = "Number of extensions : 0";
      START_NODE_ROW = Math.round(Math.random() * (59 - 0) + 0);
      START_NODE_COL = Math.round(Math.random() * (69 - 0) + 0);
      FINISH_NODE_ROW = Math.round(Math.random() * (59 - 0) + 0);
      FINISH_NODE_COL = Math.round(Math.random() * (69 - 0) + 0);
      this.cleanGrid();
      this.cleanWalls()
      const {grid}  = this.state;
      for (let i = 0; i < 50; i++) {
        for (let j = 0; j < 70; j ++) {
          var dice = Math.random() * (5 - 0) + 0;
          if ( dice > 3.5 ) {
            grid[i][j].isWall = true;
            document.getElementById(`node-${i}-${j}`).className = "node node-wall";
          }
        }
      }
      grid[START_NODE_ROW][START_NODE_COL].isWall = false;
      grid[FINISH_NODE_ROW][FINISH_NODE_COL].isWall = false;
      document.getElementById(`node-${START_NODE_ROW}-${START_NODE_COL}`).className = "node node-start"
      document.getElementById(`node-${FINISH_NODE_ROW}-${FINISH_NODE_COL}`).className = "node node-finish"
    }
  }

  cleanGrid(){
    const {grid}  = this.state;
    for (let i = 0; i < 50; i++) {
      for (let j = 0; j < 70; j ++) {
        if ( !grid[i][j].isWall ) {
          document.getElementById(`node-${i}-${j}`).className = "node ";
        }
      }
    }
    document.getElementById(`node-${START_NODE_ROW}-${START_NODE_COL}`).className = "node node-start"
    document.getElementById(`node-${FINISH_NODE_ROW}-${FINISH_NODE_COL}`).className = "node node-finish"
  }

  cleanWalls(){
    const {grid}  = this.state;
    for (let i = 0; i < 50; i++) {
      for (let j = 0; j < 70; j ++) {
        if ( grid[i][j].isWall ) {
          document.getElementById(`node-${i}-${j}`).className = "node ";
          grid[i][j].isWall = false;
        }
      }
    }
    document.getElementById(`node-${START_NODE_ROW}-${START_NODE_COL}`).className = "node node-start"
    document.getElementById(`node-${FINISH_NODE_ROW}-${FINISH_NODE_COL}`).className = "node node-finish"
  }

  visualizeBFS() {
    if (!animating) {
      animating = true;
      anim_short = false;
      this.cleanGrid();
      const { grid } = this.state;
      const startNode = grid[START_NODE_ROW][START_NODE_COL];
      const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
      const visitedNodesInOrder = bfs(grid, startNode, finishNode);
      this.animate(visitedNodesInOrder, "bfs-ext", "bfs-length", "bfs-ratio");
    }
  }

  visualizeBeam() {
    if (!animating) {
      animating = true;
      anim_short = true;
      this.cleanGrid();
      const { grid } = this.state;
      const startNode = grid[START_NODE_ROW][START_NODE_COL];
      const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
      const visitedNodesInOrder = beam(grid, startNode, finishNode);
      this.animate(visitedNodesInOrder, "beam-ext", "beam-length", "beam-ratio");
    }
  }

  visualizeDFS() {
    if (!animating) {
      animating = true;
      anim_short = false;
      this.cleanGrid();
      const { grid } = this.state;
      const startNode = grid[START_NODE_ROW][START_NODE_COL];
      const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
      const visitedNodesInOrder = dfs(grid, startNode, finishNode);
      this.animate(visitedNodesInOrder, "dfs-ext", "dfs-length", "dfs-ratio");
    }
  }

  visualizeHillClimbing() {
    if (!animating) {
      animating = true;
      anim_short = true;
      this.cleanGrid();
      const { grid } = this.state;
      const startNode = grid[START_NODE_ROW][START_NODE_COL];
      const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
      const visitedNodesInOrder = hillClimbing(grid, startNode, finishNode);
      this.animate(visitedNodesInOrder, "hc-ext", "hc-length", "hc-ratio");
    }
  }

  visualizeBestFirst() {
    if (!animating) {
      animating = true;
      anim_short = true;
      this.cleanGrid();
      const { grid } = this.state;
      const startNode = grid[START_NODE_ROW][START_NODE_COL];
      const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
      const visitedNodesInOrder = bestFirst(grid, startNode, finishNode);
      this.animate(visitedNodesInOrder, "best-ext", "best-length", "best-ratio");
    }
  }

  render() {
    const { grid } = this.state;
 
    return (
      <>
        <div className="navbar">
          <div className="logo">Algorithms Visualizer</div>
          <div className="btn-container">
            <button onClick={() => this.visualizeDFS()}>
              Visualize DFS Algorithm
            </button>
            <button onClick={() => this.visualizeHillClimbing()}>
              Visualize Hill Climbing Algorithm
            </button>
            <button onClick={() => this.visualizeBFS()}>
              Visualize BFS Algorithm
            </button>
            <button onClick={() => this.visualizeBeam()}>
              Visualize Beam Algorithm
            </button>
            <button onClick={() => this.visualizeBestFirst()}>
              Visualize Best First Algorithm
            </button>
          </div>
        </div>
        <button className="btn-maze" onClick={() => this.generateMaze()}>
          Generate maze !
        </button>

          <div className = "visualizer">
            <Stat/>
            <div className="grid">
              {grid.map((row, rowIdx) => {
                return (
                  <div className="row" key={rowIdx}>
                    {row.map((node, nodeIdx) => {
                      const {
                        row,
                        col,
                        isStart,
                        isFinish,
                        isWall,
                        mouseIsPressed
                      } = node;
                      return (
                        <Node
                          key={nodeIdx}
                          isStart={isStart}
                          isFinish={isFinish}
                          isWall={isWall}
                          mouseIsPressed={mouseIsPressed}
                          onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                          onMouseEnter={(row, col) =>
                            this.handleMouseEnter(row, col)
                          }
                          onMouseUp={() => this.handleMouseUp()}
                          row={row}
                          col={col}
                        ></Node>
                      );
                    })}
                  </div>
                );
              })}
            </div>
            <Description/>
          </div>
        <button className = "btn-grid" onClick={() => this.cleanGrid()}>
          Clean Grid
        </button>
        <button className = "btn-grid" onClick={() => this.cleanWalls()}>
          Clean Walls
        </button>
      </>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 50; row++) {
    const currentRow = [];
    for (let col = 0; col < 70; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    isWall: false
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
