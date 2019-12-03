import React, { Component } from "react";

import "./Description.css";

export default class Description extends Component {
  render() {
    return (
      <div className="description">
          <div className="card">
            <h4>How it works?</h4>
            <p>Every algorithm starts its searching operation with two informations : the start and finish squares positions.
               While exploring, they keep track of squares as visited or not, so that they do not visit any square twice.</p>
            <p>A square is marked as visited when the algorithm has indexed the new possible squares to visit from it. 
               These new reachable squares are queued in order of priority, and there the algorithms take their difference.</p><br/>
            <p><b>BFS</b> indexes all the new possible squares to visit at the end of the queue, in order of appearance.</p><br/>
            <p><b>Beam</b> indexes only the n best new possible squares to visit at the end of the queue, according to their distance to the target.</p><br/>
            <p><b>DFS</b> indexes all the new possible squares to visit at the begining of the queue, in order of appearance.</p><br/>
            <p><b>Hill-Climbing</b> indexes all the new possible squares to visit at the begining of the queue, sorted according to their distance to the target.</p><br/>
            <p><b>Best first</b> does not take into account any order of appearance and always visits the best reachable square in the queue according to its distance to the target.</p>
          </div>
      </div>
    );
  }
}