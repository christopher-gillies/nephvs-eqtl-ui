import React, { Component } from 'react';
import './SearchForm.css'
import ResultTable from './ResultTable'

class SearchResult extends Component {

  componentDidMount = () =>  {
    //Call first ajax request here
    console.log("SearchResult Mounted")
    this.props.submitQuery(this.props.query);
  }

  componentWillReceiveProps = (nextProps) => {
    //Make subsequent calls here
    console.log("SearchResult componentWillReceiveProps")
    //console.log(nextProps)
    if(nextProps.query !== this.props.query) {
      console.log("make ajax call")
      this.props.submitQuery(nextProps.query);
    }
  }

  onTabClick = (tab) => {
    this.props.handleSetTab(tab)
  }

  render() {

    //Glom and tub table display

    return(
      <div>
      <h1>Result for: {this.props.query.toUpperCase()}</h1>

      <ul className="nav nav-tabs">
        <li onClick={() => this.onTabClick('glom')} className="nav-item"><a className={ this.props.currentTab === "glom" ? "nav-link active" : "nav-link"}>Glomerulus</a></li>
        <li onClick={() => this.onTabClick('tub')} className="nav-item"><a className={ this.props.currentTab === "tub" ? "nav-link active" : "nav-link"}>Tubulointerstitial</a></li>
      </ul>

        <ResultTable maxRows={10} data={ this.props.currentTab === "glom" ?  this.props.glomResults : this.props.tubResults}
          tissue={this.props.currentTab} />

      </div>
    )
  }

}


export default SearchResult;
