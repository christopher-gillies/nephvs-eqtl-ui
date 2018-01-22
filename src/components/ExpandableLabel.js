import React, { Component } from 'react';

class ExpandableLabel extends Component {

  render() {
    return(
    <div>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">{this.props.label}</span>
        </div>
        <label className="form-control">{this.props.value}</label>
      </div>
    </div>
    );
  }
}

export default ExpandableLabel;
