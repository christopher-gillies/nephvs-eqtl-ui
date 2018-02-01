import React, { Component } from 'react';
import './ResultTable.css';
const FileSaver = require('file-saver');

class ResultTable extends Component {

  constructor(props) {
    super(props);

    let defaultSortCol = props.columns[0].key;

    if(props.defaultSortCol) {
      defaultSortCol = props.defaultSortCol;
    }
    this.state = {
      sortCol: defaultSortCol,
      sortColClass: "fa fa-sort-asc",
      pageSize: 10,
      currentPage: 1,
      showPageDropDown: false,
      sortFunction: null
    };
  }


  getClassForHeader = col => {
    if(col === this.state.sortCol) {
      return this.state.sortColClass
    } else {
      return "fa fa-sort";
    }
  }

  headerClick = (col,sortFunction = null) => {
    if(this.state.sortCol === col && this.state.sortColClass !== "fa fa-sort-desc") {
      //sort descending
      this.setState( {
        sortCol: col,
        sortColClass: "fa fa-sort-desc",
        currentPage: 1,
        sortFunction: sortFunction
      });
    } else {
      //sort ascending
      this.setState( {
        sortCol: col,
        sortColClass: "fa fa-sort-asc",
        currentPage: 1,
        sortFunction: sortFunction
      });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    //if the component is going to update then reset the page to be one
    if(this.props.data !== nextProps.data) {
      this.setState({
        currentPage: 1
      })
    }
  }

  handlePageClick = (page) => {
    this.setState( {
      currentPage: page
    })
  }

  handleNextPageClick = (numberOfPages) => {
    if(this.state.currentPage < numberOfPages) {
      this.setState( {
        currentPage: ++this.state.currentPage
      })
    }
  }

  handlePreviousPageClick = () => {
    if(this.state.currentPage > 1) {
      this.setState( {
        currentPage: --this.state.currentPage
      })
    }
  }

  createPages = (numberOfPages) => {
    let currentPage = this.state.currentPage;
    console.log("Current Page: " + currentPage);
    let pages = null;
    if(numberOfPages === 2) {
      pages = (
        <nav>
          <ul className="pagination justify-content-end">
            <li className={currentPage === 1 ? "page-item disabled" : "page-item"}><a onClick={ () => this.handlePreviousPageClick() } className="page-link">Previous</a></li>
            <li className={currentPage === 1 ? "page-item active" : "page-item"}><a className="page-link" onClick={ () => this.handlePageClick(1) }>1</a></li>
            <li className={currentPage === 2 ? "page-item active" : "page-item"}><a className="page-link" onClick={ () => this.handlePageClick(2) }>2</a></li>
            <li className={currentPage === numberOfPages ? "page-item disabled" : "page-item"}><a onClick={ () => this.handleNextPageClick(numberOfPages) } className="page-link">Next</a></li>
          </ul>
        </nav>
      );
    } else if(numberOfPages === 3) {
      pages = (
        <nav>
          <ul className="pagination justify-content-end">
            <li className={currentPage === 1 ? "page-item disabled" : "page-item"}><a onClick={ () => this.handlePreviousPageClick() } className="page-link">Previous</a></li>
            <li className={currentPage === 1 ? "page-item active" : "page-item"}><a className="page-link" onClick={ () => this.handlePageClick(1) }>1</a></li>
            <li className={currentPage === 2 ? "page-item active" : "page-item"}><a className="page-link" onClick={ () => this.handlePageClick(2) }>2</a></li>
            <li className={currentPage === 3 ? "page-item active" : "page-item"}><a className="page-link" onClick={ () => this.handlePageClick(3) }>3</a></li>
            <li className={currentPage === numberOfPages ? "page-item disabled" : "page-item"}><a onClick={ () => this.handleNextPageClick(numberOfPages) }  className="page-link">Next</a></li>
          </ul>
        </nav>
      );
    } else if(numberOfPages > 3) {
      let middlePage = Math.floor(numberOfPages / 2) + 1
      if(currentPage !== 1 && currentPage !== numberOfPages) {
        middlePage = currentPage;
      }

      pages = (
        <nav>
          <ul className="pagination justify-content-end">
            <li className={currentPage === 1 ? "page-item disabled" : "page-item"}><a onClick={ () => this.handlePreviousPageClick() } className="page-link">Previous</a></li>
            <li className={currentPage === 1 ? "page-item active" : "page-item"}><a className="page-link" onClick={ () => this.handlePageClick(1) }>1</a></li>
            <li className="page-item disabled"><a className="page-link">...</a></li>
            <li className={currentPage === middlePage ? "page-item active" : "page-item"}><a className="page-link" onClick={ () => this.handlePageClick(middlePage) }>{middlePage}</a></li>
            <li className="page-item disabled"><a className="page-link">...</a></li>
            <li className={currentPage === numberOfPages ? "page-item active" : "page-item"}><a className="page-link" onClick={ () => this.handlePageClick(numberOfPages) }>{numberOfPages}</a></li>
            <li className={currentPage === numberOfPages ? "page-item disabled" : "page-item"}><a onClick={ () => this.handleNextPageClick(numberOfPages) }  className="page-link">Next</a></li>
          </ul>
        </nav>
      );
    }
    return pages;
  }

  saveTable = () => {

    let newSort = this.copyAndSortData();
    //loop through each row
    let rows = [];
    let headerCells = [];
    this.props.columns.forEach((column) => {
      if(!column.excludeCsv) {
        headerCells.push(column.name);
      }
    });
    rows.push(headerCells.join(","))

    newSort.forEach( (rowData ) => {
      let cells = [];
      this.props.columns.forEach((column) => {
        if(!column.excludeCsv) {
          let cell = null;
          if(column.csvFormatter) {
            cell = column.csvFormatter(rowData);
          } else {
            cell = column.formatter(rowData);
          }
          cells.push(cell);
        }
      })
      rows.push(cells.join(","))
    });

    let csv = rows.join("\n");
    //let blob = new Blob([ csv ], {type: "text/plain;charset=utf-8"});
    let filename = this.props.csvFilename ? this.props.csvFilename : "data.csv";
    let file = new File([csv], filename, {type: "text/plain;charset=ascii"});
    FileSaver.saveAs(file);
  }


  copyAndSortData = () => {
    let newSort = this.props.data.slice();
    let sortFactor = this.state.sortColClass === "fa fa-sort-asc" ? 1 : -1;
    let col = this.state.sortCol
    //allow user to set sort function
    let sortFunction = this.state.sortFunction;
    if(sortFunction === null) {
      sortFunction = (a,b) => {
        if(a[col] < b[col]) return -1;
        if(a[col] > b[col]) return 1;
        return 0;
      };
    }
    newSort.sort(sortFunction);
    if(sortFactor === -1) {
      newSort.reverse();
    }
    return newSort;
  }

  //fa-sort-asc
  //fa-sort-desc
  render() {
    let newSort = this.copyAndSortData();

    let rows = [];
    //loop through each row
    let currentIndex = this.state.pageSize * ( this.state.currentPage - 1);
    for(let i = currentIndex; i < currentIndex + this.state.pageSize && i < newSort.length; i++) {
      let rowData = newSort[i];
      let cells = [];
      //loop through each column
      this.props.columns.forEach((column) => {
        let cell = (
            <td key={column.key}>{ column.formatter(rowData) }</td>
          );
        cells.push(cell);
      })

      let row = (
        <tr key={i}>
        { cells }
        </tr>
      );
      rows.push(row);
    }

    let headerCols = [];
    this.props.columns.forEach((column) => {
      let colHeader = null;
      if(column.sortable !== false) {
        colHeader = (
          <th key={column.key} onClick={ (e) => this.headerClick(column.key,column.sortFunction)} className="pointer"> {column.name} <i className={this.getClassForHeader(column.key)}></i></th>
        );
      } else {
        colHeader = ( <th key={column.name}> { column.name } </th> );
      }
      headerCols.push(colHeader);
    });

    let numberOfPages = Math.floor( this.props.data.length / this.state.pageSize ) + 1;
    console.log(numberOfPages)
    let pages = this.createPages(numberOfPages);

    let pageSizeDropDown = null;

    if(numberOfPages > 1) {
      pageSizeDropDown = (
        <div className="dropdown float-right">
        <button className="btn btn-light dropdown-toggle" onClick={ () => this.setState({showPageDropDown: !this.state.showPageDropDown}) }>
          Page size: {this.state.pageSize}
        </button>
        <div className={ this.state.showPageDropDown ? "dropdown-menu show" : "dropdown-menu" }>
          <a className="dropdown-item" onClick={ () => this.setState({pageSize: 5, showPageDropDown: false, currentPage: 1})}>5</a>
          <a className="dropdown-item" onClick={ () => this.setState({pageSize: 10, showPageDropDown: false, currentPage: 1})}>10</a>
          <a className="dropdown-item" onClick={ () => this.setState({pageSize: 20, showPageDropDown: false, currentPage: 1})}>20</a>
          <a className="dropdown-item" onClick={ () => this.setState({pageSize: 50, showPageDropDown: false, currentPage: 1})}>50</a>
          <a className="dropdown-item" onClick={ () => this.setState({pageSize: 100, showPageDropDown: false, currentPage: 1})}>100</a>
          <a className="dropdown-item" onClick={ () => this.setState({pageSize: 500, showPageDropDown: false, currentPage: 1})}>500</a>
        </div>
      </div>
      );
    }

    let saveButton = (
          <div className="float-left">
            <button className="btn btn-light" onClick={ () => this.saveTable() }>
            Download Table &nbsp;  <span className="fa fa-download"/>
            </button>
          </div> );

    let summaryStr = (<span>Showing items {currentIndex + 1} to {Math.min(this.props.data.length,currentIndex + this.state.pageSize)} of {this.props.data.length} </span>);
    if(this.props.data.length === 0) {
      summaryStr = (<span>No results...</span>);
    }
    return(
      <div>
      <table className="table table-striped smaller-font">
        <thead>
          <tr>
            { headerCols }
          </tr>
        </thead>
        <tbody>
          { rows }
        </tbody>
      </table>

      <span className="float-right">{summaryStr}</span>

      <br />
      {saveButton}

      {pageSizeDropDown}

      {pages}

      <br />
      </div>
    );
  }

}


export default ResultTable;
