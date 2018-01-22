import React, { Component } from 'react';
import './SearchForm.css'
import ResultTable from './ResultTable'
import { Link } from 'react-router-dom'
import ClusterPlot from './ClusterPlot'
import Expandable from './Expandable'
//import ExpandableLabel from './ExpandableLabel'

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
      this.props.submitQuery(nextProps.query, nextProps.filters.maxPVal);
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
    //variable to indicate if this is the X chromosome
    let tmpIsX = false;
    if(this.props.glomResults && this.props.glomResults.length > 0) {
      tmpIsX = (this.props.glomResults[0].chrom === "X");
    }
    const isX = tmpIsX;

    let chrPosSort = (a,b) => {
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
    };

    //Matrix eQTL columns
    let matrixEQTLColumns = [
      {
        key: 'entrezId',
        name: "Entrez Id",
        formatter: (rowData) => {
          let linkTo = "/searchResult/" + rowData.entrezId;
          return (<Link onClick={() => this.linkClick(0.05)} to={linkTo}>{rowData.entrezId}</Link>);
        },
        csvFormatter: (rowData) => rowData.entrezId
      },
      {
        key: 'geneSymbol',
        name: "Gene Symbol",
        formatter: (rowData) => {
          let linkTo = "/searchResult/" + rowData.geneSymbol;
          return (<Link onClick={() => this.linkClick(0.05)} to={linkTo}><i>{rowData.geneSymbol}</i></Link>)
        },
        csvFormatter: (rowData) => rowData.geneSymbol
      },
      {
        key: 'dbSNPId',
        name: "dbSNPId",
        formatter: (rowData) => {
          let linkTo = "/searchResult/" + rowData.dbSNPId;
          return (<Link to={linkTo}>{rowData.dbSNPId}</Link>)
        },
        csvFormatter: (rowData) => rowData.dbSNPId
      },
      {
        key: 'chrom:Pos',
        name: "Chr:pos",
        formatter: (rowData) => {
          let content = rowData.chrom + ":" + rowData.pos;
          let linkTo = "/searchResult/" + content;
          return (<Link to={linkTo}>{content}</Link>)
        },
        csvFormatter: (rowData) => rowData.chrom + ":" + rowData.pos,
        sortFunction: chrPosSort
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
        },
        csvFormatter: (rowData) => rowData.ref,
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
        },
        csvFormatter: (rowData) => rowData.alt,
      },
      {
        key: 'overallAf',
        name: "Alt. AF",
        formatter: (rowData) => !isX ? rowData.overallAf.toPrecision(2) : null,
        csvFormatter: (rowData) => !isX ? rowData.overallAf : null,
      },
      {
        key: 'beta',
        name: "Beta",
        formatter: (rowData) => rowData.beta.toPrecision(2),
        csvFormatter: (rowData) => rowData.beta,
      },
      {
        key: 'tStat',
        name: "t-statistic",
        formatter: (rowData) => rowData.tStat.toPrecision(2),
        csvFormatter: (rowData) => rowData.tStat,
      },
      {
        key: 'pVal',
        name: "P-value",
        formatter: (rowData) => {
          if(rowData.pVal < 0.001) {
            return rowData.pVal.toExponential(2)
          } else {
            return rowData.pVal.toPrecision(2)
          }
        },
        csvFormatter: (rowData) => rowData.pVal,
      },
      {
        key: 'Action',
        name: 'Action',
        formatter: (rowData) => {
          let tissue = null;
          if(this.props.currentTab === "tub") {
            tissue = "tube";
          } else {
            tissue = "glom";
          }
          let linkTo = "/detail/tissue/" + tissue + "/gene/" + rowData.entrezId + "/variant/" + encodeURIComponent(rowData.variantStr);
          return (<Link to={linkTo}>View Data</Link>)
        },
        sortable: false,
        excludeCsv: true
      },
    ];

    let matrixEQLTCsvFilename = this.props.currentTab === "glom" ?  "glom" : "tub";
    matrixEQLTCsvFilename += '_MatrixEQTL_' + this.props.query + ".csv";

    let filters = (
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


    /*
      DAP Plot and Table
    */
    let DAPFineMapping = null;
    let DAPTableColumns = [
      {
        key: 'entrezId',
        name: "Entrez Id",
        formatter: (rowData) => {
          let linkTo = "/searchResult/" + rowData.entrezId;
          return (<Link onClick={() => this.linkClick(0.05)} to={linkTo}>{rowData.entrezId}</Link>);
        },
        csvFormatter: (rowData) => rowData.entrezId
      },
      {
        key: 'symbol',
        name: "Gene Symbol",
        formatter: (rowData) => {
          let linkTo = "/searchResult/" + rowData.symbol;
          return (<Link onClick={() => this.linkClick(0.05)} to={linkTo}><i>{rowData.symbol}</i></Link>)
        },
        csvFormatter: (rowData) => rowData.symbol
      },
      {
        key: 'dbSNPId',
        name: "dbSNPId",
        formatter: (rowData) => {
          let linkTo = "/searchResult/" + rowData.dbSNPId;
          return (<Link to={linkTo}>{rowData.dbSNPId}</Link>)
        },
        csvFormatter: (rowData) => rowData.dbSNPId
      },
      {
        key: 'chrom:Pos',
        name: "Chr:pos",
        formatter: (rowData) => {
          let content = rowData.chrom + ":" + rowData.pos;
          let linkTo = "/searchResult/" + content;
          return (<Link to={linkTo}>{content}</Link>)
        },
        csvFormatter: (rowData) => rowData.chrom + ":" + rowData.pos,
        sortFunction: chrPosSort
      },
      {
        key: 'ref',
        name: "Ref",
        formatter: (rowData) => rowData.ref,
        csvFormatter: (rowData) => rowData.ref,
      },
      {
        key: 'alt',
        name: "Alt",
        formatter: (rowData) => rowData.alt,
        csvFormatter: (rowData) => rowData.alt,
      },
      {
        key: 'af',
        name: "Alt. AF",
        formatter: (rowData) => rowData.af.toPrecision(2),
        csvFormatter: (rowData) => rowData.af,
      },
      {
        key: 'variantPip',
        name: "Variant PIP",
        formatter: (rowData) => rowData.variantPip.toPrecision(2),
        csvFormatter: (rowData) => rowData.variantPip,
      },
      {
        key: 'cluster',
        name: "Cluster #",
        formatter: (rowData) => rowData.cluster,
        csvFormatter: (rowData) => rowData.cluster,
      },
      {
        key: 'clusterPip',
        name: "Cluster PIP",
        formatter: (rowData) => rowData.clusterPip.toPrecision(2),
        csvFormatter: (rowData) => rowData.clusterPip,
      },
      {
        key: 'clusterVars',
        name: "# of variants in cluster",
        formatter: (rowData) => rowData.clusterVars,
        csvFormatter: (rowData) => rowData.clusterVars,
      }
    ];

    let DAPCsvFilename = this.props.currentTab === "glom" ?  "glom" : "tub";
    DAPCsvFilename += '_DAP_' + this.props.query + ".csv";


    //ONLY SHOW DAPPlot and Table if this is a gene result
    if(this.props.queryType === "GeneSymbol" || this.props.queryType === "Entrez" || this.props.queryType === "Ensembl") {
      let tissue = null;
      if(this.props.currentTab === "tub") {
        tissue = "tube";
      } else {
        tissue = "glom";
      }

      //create result table for DAPResultTable
      let DAPResultTable = [];
      let tissueRes = null;
      //Only do this if the dapResult is available
      if(this.props.dapResult) {
        tissueRes = this.props.dapResult.tissues[tissue];
        tissueRes.clusters.forEach( (cluster) => {
          cluster.variants.forEach( (variant ) => {
            let obj = {
              entrezId: this.props.dapResult.gene.entrezId,
              symbol: this.props.dapResult.gene.symbol,
              chrom: variant.chrom,
              pos: variant.pos,
              ref: variant.ref,
              alt: variant.alt,
              dbSNPId: variant.dbSNPId,
              af: variant.af,
              variantPip: variant.pip,
              cluster: cluster.cluster,
              clusterPip: cluster.pip,
              clusterVars: cluster.variants.length
            };
            DAPResultTable.push(obj);
          });
        });

        DAPFineMapping = (
          <div>
            <Expandable title="DAP Fine Mapping Plot:">
            <div className="text-center">
            <ClusterPlot height={400} width={800}  gene={this.props.dapResult.gene} clusters={this.props.dapResult.tissues[tissue].clusters}
              expSize={this.props.dapResult.tissues[tissue].expSize}
              geneNull={this.props.dapResult.tissues[tissue].geneNull}
              fdr={this.props.dapResult.tissues[tissue].fdr} />
            </div>
            <br />
            </Expandable>
            <Expandable title="DAP Fine Mapping Table:">

              <p><b>Summary of DAP gene-level results</b></p>
              <table className="table">
                <tbody>
                  <tr>
                    <td>Gene-level FDR: </td>
                    <td>{this.props.dapResult.tissues[tissue].fdr.toPrecision(2)}</td>
                  </tr>
                  <tr>
                    <td>Probability of no eQTL: </td>
                    <td>{this.props.dapResult.tissues[tissue].geneNull.toPrecision(2)}</td>
                  </tr>
                  <tr>
                    <td>Expected # of eQTLs: </td>
                    <td>{this.props.dapResult.tissues[tissue].expSize.toPrecision(2)}</td>
                  </tr>
                  <tr>
                    <td>Number of clusters: </td>
                    <td>{this.props.dapResult.tissues[tissue].clusters.length}</td>
                  </tr>
                </tbody>
              </table>

              <ResultTable data={ DAPResultTable }
                columns={ DAPTableColumns } csvFilename={DAPCsvFilename} defaultSortCol="cluster"/>
                <br />
            </Expandable>
          </div>
        );
      }



    }

    console.log(this.props.filters);




    let note = null;
    if(isX) {
      note=(<small>*Please note the the allele frequency is computed as 2 times number of homozygous alternative subjects +
            number of heterozygotes divided by 2 times the number of subjects. So for the X chromosome, this allele frequency will be incorrect.
        </small>
      );
    }

    return(
      <div>
        <h1>Result for: <span className={this.props.queryType === "GeneSymbol" ? "font-italic" : ""}>
        {this.props.queryType === "GeneSymbol" ? this.props.query.toUpperCase() : this.props.query}</span></h1>

        <div className="border">
          <ul className="nav nav-tabs">
            <li onClick={() => this.onTabClick('glom')} className="nav-item"><a className={ this.props.currentTab === "glom" ? "nav-link active" : "nav-link"}>Glomerulus</a></li>
            <li onClick={() => this.onTabClick('tub')} className="nav-item"><a className={ this.props.currentTab === "tub" ? "nav-link active" : "nav-link"}>Tubulointerstitium</a></li>
          </ul>
          <br />

          <Expandable title="Filters:">
            { filters }
            <br />
          </Expandable>


          {DAPFineMapping}


          <Expandable title="Matrix eQTL Results:" startExpanded={true}>
            { note }
            <ResultTable data={ this.props.currentTab === "glom" ?  this.props.glomResults : this.props.tubResults}
              columns={ matrixEQTLColumns } csvFilename={matrixEQLTCsvFilename} defaultSortCol="pVal" />
          </Expandable>

        </div>
        <br />
      </div>
    )
  }

}


export default SearchResult;
