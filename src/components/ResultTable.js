import React, { Component } from 'react';
import './ResultTable.css'
import { Link } from 'react-router-dom'

class ResultTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sortCol: "pVal",
      sortColClass: "fa fa-sort-asc",
    };
  }


  getClassForHeader = col => {
    if(col === this.state.sortCol) {
      return this.state.sortColClass
    } else {
      return "fa fa-sort";
    }
  }

  headerClick = col => {
    if(this.state.sortCol === col && this.state.sortColClass !== "fa fa-sort-desc") {
      //sort descending
      this.setState( {
        sortCol: col,
        sortColClass: "fa fa-sort-desc",
      });
    } else {
      //sort ascending
      this.setState( {
        sortCol: col,
        sortColClass: "fa fa-sort-asc",
      });
    }
  }

  //fa-sort-asc
  //fa-sort-desc
  render() {

    let newSort = this.props.data.slice();
    let sortFactor = this.state.sortColClass === "fa fa-sort-asc" ? 1 : -1;
    let col = this.state.sortCol
    newSort.sort((a,b) => {
      if(a[col] < b[col]) return -1 * sortFactor;
      if(a[col] > b[col]) return 1 * sortFactor;
      return 0;
    });

    let rows = [];
    for(let i = 0; i < this.props.maxRows && i < newSort.length; i++) {
      let rowData = newSort[i];
      let linkTo = "/pairResult/tissue/" + this.props.tissue + "/gene/" + rowData.entrezId + "/variant/" + rowData.variantStr
      let content = (
        <tr key={i}>
        <td>{rowData.entrezId}</td>
        <td>{ rowData.geneSymbol }</td>
        <td>{ rowData.variantStr.substring(0,20) }</td>
        <td>{ rowData.beta }</td>
        <td>{ rowData.tStat }</td>
        <td>{ rowData.pVal }</td>
        <td><Link to={linkTo}>Gene/variant pair detail</Link></td>
        </tr>
      );
      rows.push(content);
    }

    return(
      <div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th onClick={ (e) => this.headerClick('entrezId')} scope="col" className="pointer">Entrez Id <i className={this.getClassForHeader('entrezId')} aria-hidden="true"></i></th>
            <th onClick={ (e) => this.headerClick('symbol')} scope="col" className="pointer"> Gene Symbol <i className={this.getClassForHeader('symbol')} aria-hidden="true"></i></th>
            <th onClick={ (e) => this.headerClick('variantStr')} scope="col" className="pointer">SNP <i className={this.getClassForHeader('variantStr')} aria-hidden="true"></i></th>
            <th onClick={ (e) => this.headerClick('beta')} scope="col" className="pointer">Beta <i className={this.getClassForHeader('beta')}aria-hidden="true"></i></th>
            <th onClick={ (e) => this.headerClick('tStat')} scope="col" className="pointer">t-statistic <i className={this.getClassForHeader('tStat')}aria-hidden="true"></i></th>
            <th onClick={ (e) => this.headerClick('pVal')} scope="col" className="pointer">p-value <i className={this.getClassForHeader('pVal')} aria-hidden="true"></i></th>
            <th> Action </th>
          </tr>
        </thead>
        <tbody>
        {rows}
        </tbody>
      </table>

      </div>
    )
  }

}


export default ResultTable;
