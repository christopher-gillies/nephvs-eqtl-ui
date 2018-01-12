import React, { Component } from 'react';

class Card extends Component {
/*

This object is a box with a title and soem choldren elements.
It creates a bootstrap card

*/


  render() {
    let size = "col-sm-4";
    if(this.props.size !== undefined) {
      size = this.props.size;
    }
    size += " mt-2 mb-2"
    return (
        <div className={size}>
          <div className="card">

            <div className="card-header">
              {this.props.title}
            </div>
            <div className="card-body">
              {this.props.children}
            </div>

          </div>
        </div>
    );
  }
}

export default Card;
