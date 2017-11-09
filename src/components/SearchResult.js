import React, { Component } from 'react';
import './SearchForm.css'
import ResultTable from './ResultTable'
var matrixeQTLResGlom = [
  {
    entrez: 1,
    symbol: "inf2",
    snp: "1:123",
    t_stat: -5,
    beta: -1,
    p_val: 0.01
  },
  {
    entrez: 1,
    symbol: "inf2",
    snp: "1:1234",
    t_stat: -5,
    beta: -1,
    p_val: 0.0001
  },
  {
    entrez: 1,
    symbol: "inf2",
    snp: "1:1235",
    t_stat: -5,
    beta: -1,
    p_val: 0.001
  }
];

var matrixeQTLResTub = [
  {
    entrez: 1,
    symbol: "inf2",
    snp: "1:123",
    t_stat: -5,
    beta: -1,
    p_val: 0.01
  },
];

class SearchResult extends Component {

  componentDidMount = () =>  {
    //Call first ajax request here
    console.log("SearchResult Mounted")
  }

  componentWillReceiveProps = (nextProps) => {
    //Make subsequent calls here
    console.log("SearchResult componentWillReceiveProps")
    console.log(nextProps)
    if(nextProps.query !== this.props.query) {
      console.log("make ajax call")
    }
  }

  onTabClick = (tab) => {
    this.props.handleSetTab(tab)
  }

  render() {

    //Glom and tub table display

    return(
      <div>
      <h1>Result for: {this.props.query}</h1>

      <ul className="nav nav-tabs">
        <li onClick={() => this.onTabClick('glom')} className="nav-item"><a className={ this.props.currentTab === "glom" ? "nav-link active" : "nav-link"}>Glomerulus</a></li>
        <li onClick={() => this.onTabClick('tub')} className="nav-item"><a className={ this.props.currentTab === "tub" ? "nav-link active" : "nav-link"}>Tubulointerstitial</a></li>
      </ul>

        <ResultTable data={ this.props.currentTab === "glom" ?  matrixeQTLResGlom : matrixeQTLResTub}
          tissue={this.props.currentTab} />

      </div>
    )
  }

}


export default SearchResult;
