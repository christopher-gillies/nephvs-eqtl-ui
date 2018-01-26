import React, { Component } from 'react';
import { HashLink as Link } from 'react-router-hash-link';

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

    let helpLinkText = this.props.helpLink;
    let helpLink = null;
    if(helpLinkText) {
      helpLink = (<Link to={helpLinkText}><i className="fa fa-question-circle-o" aria-hidden="true"></i></Link>);
    }
    return (
      <div className="card">
        <div className="card-header">
          <h5 className="d-inline card-title">{this.props.title} {helpLink}</h5>
          <button className="btn btn-outline-primary btn-sm float-right" onClick={this.onClick}>{this.state.expand === true ? "-" : "+"}</button>
        </div>

        {children}
      </div>
    );
  }
}

export default Expandable;
