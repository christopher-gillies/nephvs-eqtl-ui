import React, { Component } from 'react';



class PairResult extends Component {

  componentDidMount = () =>  {
    //make ajax calls for this page
    //this.props.submitQuery(this.props.query, this.props.filters.maxPVal);
  }

  componentWillReceiveProps = (nextProps) => {
    //make ajax calls for this page
    //this.props.submitQuery(nextProps.query, this.props.filters.maxPVal);
  }

  render() {

    return(
      <div>
      <h1>Gene / Variant Pair Result</h1>
      <h3>Tissue: {this.props.match.params.tissue}</h3>
      <h3>Gene: {this.props.match.params.gene}</h3>
      <h3>Variant: {this.props.match.params.variant}</h3>
      </div>
    )
  }

}


export default PairResult;
