import React, { Component } from 'react';

class Expandable extends Component {

  constructor(props){
     super(props)

     let defaultState = false;

     //All this to start in expanded state
     if(props.startExpanded) {
       defaultState = true;
     }

     this.state = {
       expand: defaultState
     };
  }

 //on click flip the state
 onClick = () => {
   this.setState( {
     expand: !this.state.expand
   });
 }

  render() {

    let children = null;
    if(this.state.expand) {
      children = this.props.children;
    }

    return (
      <div className="card">
        <div className="card-header">
          <h5 className="d-inline card-title">{this.props.title}</h5>
          <button className="btn btn-outline-primary btn-sm float-right" onClick={this.onClick}>{this.state.expand === true ? "-" : "+"}</button>
        </div>

        {children}
      </div>
    );
  }
}

export default Expandable;
