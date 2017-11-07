import React, { Component } from 'react';
import './ResultTable.css'
import { Link } from 'react-router-dom'

class ResultTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sortCol: "p_val",
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
    for(let i = 0; i < newSort.length; i++) {
      let rowData = newSort[i];
      let linkTo = "/pairResult/tissue/" + this.props.tissue + "/gene/" + rowData.entrez + "/variant/" + rowData.snp
      let content = (
        <tr key={i}>
        <td>{rowData.entrez}</td>
        <td>{ rowData.symbol }</td>
        <td>{ rowData.snp }</td>
        <td>{ rowData.beta }</td>
        <td>{ rowData.t_stat }</td>
        <td>{ rowData.p_val }</td>
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
            <th onClick={ (e) => this.headerClick('entrez')} scope="col" className="pointer">Entrez Id <i className={this.getClassForHeader('entrez')} aria-hidden="true"></i></th>
            <th onClick={ (e) => this.headerClick('symbol')} scope="col" className="pointer"> Gene Symbol <i className={this.getClassForHeader('symbol')} aria-hidden="true"></i></th>
            <th onClick={ (e) => this.headerClick('snp')} scope="col" className="pointer">SNP <i className={this.getClassForHeader('snp')} aria-hidden="true"></i></th>
            <th onClick={ (e) => this.headerClick('beta')} scope="col" className="pointer">Beta <i className={this.getClassForHeader('beta')}aria-hidden="true"></i></th>
            <th onClick={ (e) => this.headerClick('t_stat')} scope="col" className="pointer">t-statistic <i className={this.getClassForHeader('t_stat')}aria-hidden="true"></i></th>
            <th onClick={ (e) => this.headerClick('p_val')} scope="col" className="pointer">p-value <i className={this.getClassForHeader('p_val')} aria-hidden="true"></i></th>
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
