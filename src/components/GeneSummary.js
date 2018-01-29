import React, { Component } from 'react';
import ResultTable from './ResultTable'
import Expandable from './Expandable'
import { Link } from 'react-router-dom'

class GeneSummary extends Component {

    constructor(props){
       super(props)
       this.state = {
         fdrView: props.fdr
       }
    }

    componentDidMount = () =>  {
      //Call first ajax request here
      console.log("GeneSummary Mounted")
      this.props.handleGetSummary(this.props.fdr);
      this.setState({fdrView: this.props.fdr});
    }

    //componentWillReceiveProps = (nextProps) => {
      //Make subsequent calls here
      //console.log("GeneSummary componentWillReceiveProps")
      //this.props.handleGetSummary(nextProps.fdr);
    //}

    onTabClick = (tab) => {
      this.props.handleSetTab(tab)
    }

    onFDRChange = (event) => {
      this.props.handleFDRChange(event.target.value);
    }

    onUpdateClick = (event) => {
      this.props.handleGetSummary(this.props.fdr);
      this.setState({fdrView: this.props.fdr});
      event.preventDefault();
    }

    render() {

      //variable to label the top of screen better
      let currentTabStr = "";
      if(this.props.currentTab === "glom") {
        currentTabStr = "Glomerulus";
      } else {
        currentTabStr = "Tubulointerstitium"
      }

      let filters = (
          <div className="card-body">
            <form onSubmit={this.onUpdateClick}>
              <div className="form-group">
                <label>Maximum FDR for variants to retrieve from server:</label>
                <input onChange={this.onFDRChange}
                  className="form-control" type="number" min="0" max="1" placeholder="Maximum FDR to retrieve from server" step="any" value={this.props.fdr}/>
              </div>
              <input type="submit" className="btn btn-primary" value="Update" />
            </form>
          </div>
        );

      let geneSummaryCols = [
        {
          key: 'entrezId',
          name: "Entrez Id",
          formatter: (rowData) => {
            let linkTo = "/searchResult/" + rowData.entrezId;
            return (<Link to={linkTo}>{rowData.entrezId}</Link>);
          },
          csvFormatter: (rowData) => rowData.entrezId
        },
        {
          key: 'symbol',
          name: "Gene Symbol",
          formatter: (rowData) => {
            let linkTo = "/searchResult/" + rowData.symbol;
            return (<Link to={linkTo}><i>{rowData.symbol}</i></Link>)
          },
          csvFormatter: (rowData) => rowData.symbol
        },
        {
          key: 'description',
          name: "Description",
          formatter: (rowData) => rowData.description,
          csvFormatter: (rowData) => '"' + rowData.description + '"'
        },
        {
          key: 'expSize',
          name: "Exp. # of eQTLs",
          formatter: (rowData) => rowData.expSize.toPrecision(3),
          csvFormatter: (rowData) => rowData.expSize.toPrecision(3)
        },
        {
          key: 'geneNull',
          name: "Pr. of no eQTL",
          formatter: (rowData) => rowData.geneNull.toPrecision(3),
          csvFormatter: (rowData) => rowData.geneNull.toPrecision(3)
        },
        {
          key: 'fdr',
          name: "FDR",
          formatter: (rowData) => rowData.fdr.toPrecision(3),
          csvFormatter: (rowData) => rowData.fdr.toPrecision(3)
        },
      ];

      let geneSummaryCsvFilename = this.props.currentTab === "glom" ?  "glom" : "tub";
      geneSummaryCsvFilename += '_GeneSummary_FDR_' + this.props.fdr + ".csv";

      return (
        <div>
          <div className="border">
            <ul className="nav nav-tabs">
              <li onClick={() => this.onTabClick('glom')} className="nav-item"><a className={ this.props.currentTab === "glom" ? "nav-link active" : "nav-link"}>Glomerulus</a></li>
              <li onClick={() => this.onTabClick('tub')} className="nav-item"><a className={ this.props.currentTab === "tub" ? "nav-link active" : "nav-link"}>Tubulointerstitium</a></li>
            </ul>
            <br />

            <h2>eQTL gene-level summary where FDR &le; {this.state.fdrView} in { currentTabStr }</h2>


            <Expandable title="Filters:">
              { filters }
              <br />
            </Expandable>

            <Expandable title="eQTL gene-level summary" startExpanded={true} helpLink="/help#DAP">
              <ResultTable data={ this.props.currentTab === "glom" ?  this.props.glomSummaries : this.props.tubSummaries}
                columns={ geneSummaryCols } csvFilename={geneSummaryCsvFilename} defaultSortCol="fdr" />
            </Expandable>
          </div>
          <br />
        </div>
      );
    }
}

export default GeneSummary;
