import React, { Component } from 'react';
import './SearchForm.css'
import ResultTable from './ResultTable'
import { Link } from 'react-router-dom'

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
    let columns = [
      {
        key: 'entrezId',
        name: "Entrez Id",
        formatter: (rowData) => rowData.entrezId
      },
      {
        key: 'geneSymbol',
        name: "Gene Symbol",
        formatter: (rowData) => (<i>{rowData.geneSymbol}</i>)
      },
      {
        key: 'dbSNPId',
        name: "dbSNPId",
        formatter: (rowData) => rowData.dbSNPId
      },
      {
        key: 'chrom',
        name: "Chrom.",
        formatter: (rowData) => rowData.chrom
      },
      {
        key: 'pos',
        name: "Pos.",
        formatter: (rowData) => rowData.pos
      },
      {
        key: 'reference',
        name: "Ref.",
        formatter: (rowData) => {
          if(rowData.ref.length > 5) {
            return rowData.ref.substring(0,5) + "...";
          } else {
            return rowData.ref;
          }
        }
      },
      {
        key: 'alt',
        name: "Alt.",
        formatter: (rowData) => {
          if(rowData.alt.length > 5) {
            return rowData.alt.substring(0,5) + "...";
          } else {
            return rowData.alt;
          }
        }
      },
      {
        key: 'beta',
        name: "Beta",
        formatter: (rowData) => rowData.beta.toPrecision(3)
      },
      {
        key: 'tStat',
        name: "t-statistic",
        formatter: (rowData) => rowData.tStat.toPrecision(3)
      },
      {
        key: 'pVal',
        name: "P-value",
        formatter: (rowData) => {
          if(rowData.pVal < 0.001) {
            return rowData.pVal.toExponential(3)
          } else {
            return rowData.pVal.toPrecision(3)
          }
        }
      },
      {
        key: 'Action',
        name: 'Action',
        formatter: (rowData) => {
          let linkTo = "/pairResult/tissue/" + this.props.currentTab + "/gene/" + rowData.entrezId + "/variant/" + rowData.variantStr;
          return (<Link to={linkTo}>View Data</Link>)
        },
        sortable: false
      },
    ];

    return(
      <div>
        <h1>Result for: <span className={this.props.queryType === "GeneSymbol" ? "font-italic" : ""}> {this.props.query.toUpperCase()}</span></h1>

        <div className="border-top-0">
        <ul className="nav nav-tabs">
          <li onClick={() => this.onTabClick('glom')} className="nav-item"><a className={ this.props.currentTab === "glom" ? "nav-link active" : "nav-link"}>Glomerulus</a></li>
          <li onClick={() => this.onTabClick('tub')} className="nav-item"><a className={ this.props.currentTab === "tub" ? "nav-link active" : "nav-link"}>Tubulointerstitial</a></li>
        </ul>

          <ResultTable data={ this.props.currentTab === "glom" ?  this.props.glomResults : this.props.tubResults}
            columns={ columns } />
        </div>

      </div>
    )
  }

}


export default SearchResult;
