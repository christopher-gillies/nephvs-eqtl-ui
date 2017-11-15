import React, { Component } from 'react';
import './SearchForm.css'
import ResultTable from './ResultTable'
import { Link } from 'react-router-dom'

class SearchResult extends Component {

  componentDidMount = () =>  {
    //Call first ajax request here
    console.log("SearchResult Mounted")
    this.props.submitQuery(this.props.query, this.props.filters.maxPVal);
  }

  componentWillReceiveProps = (nextProps) => {
    //Make subsequent calls here
    console.log("SearchResult componentWillReceiveProps")
    //console.log(nextProps)
    if(nextProps.query !== this.props.query) {
      console.log("make ajax call")
      this.props.submitQuery(nextProps.query, nextProps.maxPVal);
    }
  }

  onTabClick = (tab) => {
    this.props.handleSetTab(tab)
  }

  onShowFilters = () => {
    let filters = this.props.filters;

    this.props.handleSetFilters({ ...filters,
      visible: !filters.visible
    });
  }

  onPValChange = (event) => {
    let filters = this.props.filters;

    this.props.handleSetFilters({ ...filters,
      maxPVal:  event.target.value
    });
  }

  linkClick = (maxPVal) => {
    let filters = this.props.filters;

    this.props.handleSetFilters({ ...filters,
      maxPVal:  maxPVal
    });
  }

  onUpdateClick = (e) => {
    this.props.submitQuery(this.props.query, this.props.filters.maxPVal);
    e.preventDefault();
  }

  render() {

    //Glom and tub table display
    let columns = [
      {
        key: 'entrezId',
        name: "Entrez Id",
        formatter: (rowData) => {
          let linkTo = "/searchResult/" + rowData.entrezId;
          return (<Link onClick={() => this.linkClick(0.05)} to={linkTo}><i>{rowData.entrezId}</i></Link>);
        }
      },
      {
        key: 'geneSymbol',
        name: "Gene Symbol",
        formatter: (rowData) => {
          let linkTo = "/searchResult/" + rowData.geneSymbol;
          return (<Link onClick={() => this.linkClick(0.05)} to={linkTo}><i>{rowData.geneSymbol}</i></Link>)
        }
      },
      {
        key: 'dbSNPId',
        name: "dbSNPId",
        formatter: (rowData) => {
          let linkTo = "/searchResult/" + rowData.dbSNPId;
          return (<Link to={linkTo}>{rowData.dbSNPId}</Link>)
        }
      },
      {
        key: 'chrom:Pos',
        name: "Chr:pos",
        formatter: (rowData) => {
          let content = rowData.chrom + ":" + rowData.pos;
          let linkTo = "/searchResult/" + content;
          return (<Link to={linkTo}>{content}</Link>)
        },
        sortFunction: (a,b) => {
          let chrA = a['chrom'];
          let posA = a['pos'];
          let chrB = b['chrom'];
          let posB = b['pos'];

          if(chrA < chrB) {
            return -1;
          } else if(chrB > chrA) {
            return 1;
          } else {
            if(posA < posB) {
              return -1;
            } else if(posB < posA) {
              return 1;
            } else {
              return 0;
            }
          }
        }
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
        key: 'overallAf',
        name: "Alt. AF",
        formatter: (rowData) => rowData.overallAf.toPrecision(3)
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

    let filters = null;

    if(this.props.filters.visible === true) {
      filters = (
        <div className="card-body">
          <form onSubmit={this.onUpdateClick}>
            <div className="form-group">
              <label>Maximum p-value for variants to retrieve from server:</label>
              <input onChange={this.onPValChange}
                className="form-control" type="number" min="0" max="1" placeholder="Maximum p-value to retrieve from server" step="0.01" value={this.props.filters.maxPVal}/>
            </div>
            <input type="submit" className="btn btn-primary" value="Update" />
          </form>
        </div>
      );
    }

    return(
      <div>
        <h1>Result for: <span className={this.props.queryType === "GeneSymbol" ? "font-italic" : ""}>
        {this.props.queryType === "GeneSymbol" ? this.props.query.toUpperCase() : this.props.query}</span></h1>

        <div className="border">
        <ul className="nav nav-tabs">
          <li onClick={() => this.onTabClick('glom')} className="nav-item"><a className={ this.props.currentTab === "glom" ? "nav-link active" : "nav-link"}>Glomerulus</a></li>
          <li onClick={() => this.onTabClick('tub')} className="nav-item"><a className={ this.props.currentTab === "tub" ? "nav-link active" : "nav-link"}>Tubulointerstitial</a></li>
        </ul>
        <br />
          <div className="card">
            <div className="card-header">
              <h5 className="d-inline card-title">Filters:</h5>
              <button className="btn btn-outline-primary btn-sm float-right" onClick={this.onShowFilters}>{this.props.filters.visible === true ? "-" : "+"}</button>
            </div>
            { filters }
          </div>
          <br />
          <br />
          <ResultTable data={ this.props.currentTab === "glom" ?  this.props.glomResults : this.props.tubResults}
            columns={ columns } />
        </div>

      </div>
    )
  }

}


export default SearchResult;
