import React, { Component } from "react";

import "./Stat.css";

export default class Stat extends Component {
  render() {
    return (
      <div className="stat">
        <div className="card">
            <p><b>DFS</b></p><br/>
            <p id="dfs-ext">
                Number of extensions : 0 
            </p>
            <p id="dfs-length">
                Path length : 0 
            </p>
            <p id="dfs-ratio">
                Path finding cost : 0.00
            </p>
        </div>
        <div className="card">
            <p><b>Hill-Climbing</b></p><br/>
            <p id="hc-ext">
                Number of extensions : 0 
            </p>
            <p id="hc-length">
                Path length : 0 
            </p>
            <p id="hc-ratio">
                Path finding cost : 0.00
            </p>
        </div>
        <div className="card">
            <p><b>BFS</b></p><br/>
            <p id="bfs-ext">
                Number of extensions : 0 
            </p>
            <p id="bfs-length">
                Path length : 0 
            </p>
            <p id="bfs-ratio">
                Path finding cost : 0.00
            </p>
        </div>
        <div className="card">
            <p><b>Beam</b></p><br/>
            <p id="beam-ext">
                Number of extensions : 0 
            </p>
            <p id="beam-length">
                Path length : 0 
            </p>
            <p id="beam-ratio">
                Path finding cost : 0.00
            </p>
        </div>
        <div className="card">
            <p><b>Best First</b></p><br/>
            <p id="best-ext">
                Number of extensions : 0 
            </p>
            <p id="best-length">
                Path length : 0 
            </p>
            <p id="best-ratio">
                Path finding cost : 0.00
            </p>
        </div>
      </div>
    );
  }
}
