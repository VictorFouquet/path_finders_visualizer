import React, { Component } from "react";
import Node from "./Node/Node";

import "./PathFindersVisualizer.css";

export default class PathFindersVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: []
    };
  }

  componentDidMount() {
    const nodes = [];
    for (let row = 0; row < 50; row++) {
      const currentRow = [];
      for (let col = 0; col < 100; col++) {
        const currentNode = {
          col,
          row,
          isStart: row === 10 && col === 5,
          isFinish: row === 34 && col === 70
        };

        currentRow.push(currentNode);
      }
      nodes.push(currentRow);
    }
    this.setState({ nodes });
  }

  render() {
    const { nodes } = this.state;

    return (
      <div className="board">
        {nodes.map((row, rowIdx) => {
          return (
            <div className="row" key={rowIdx}>
              {row.map((node, nodeIdx) => {
                const { isStart, isFinish } = node;
                return (
                  <Node
                    key={nodeIdx}
                    isStart={isStart}
                    isFinish={isFinish}
                    test={"kappa"}
                  ></Node>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}
