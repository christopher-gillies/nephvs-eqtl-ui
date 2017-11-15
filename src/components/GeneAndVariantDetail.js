import React, { Component } from 'react';
import Card from './Card'


class GeneAndVariantDetail extends Component {

  componentDidMount = () =>  {
    //make ajax calls for this page
    let tissue = this.props.match.params.tissue;
    let gene = this.props.match.params.gene;
    let variant = this.props.match.params.variant;

    if(tissue === "glom" || tissue === "tube") {
      this.props.handleGetGeneAndVariantDetail(gene,variant,tissue);
    }
  }

  componentWillReceiveProps = (nextProps) => {
    //make ajax calls for this page
    console.log(nextProps)
  }

  afFormatter = (af) => {
    if(af) {
      return (af * 100).toPrecision(3) + "%"
    }
  }

  render() {

    let pValFormat = null;
    if(this.props.variantDetail.pVal !== null && this.props.variantDetail.pVal !== undefined) {
      if(this.props.variantDetail.pVal < 0.001) {
        pValFormat = this.props.variantDetail.pVal.toExponential(3);
      } else {
        pValFormat = this.props.variantDetail.pVal.toPrecision(3);
      }
    }
    console.log(this.props)
    return(
      <div className="container-fluid">
      <h1>Gene and Variant Detail</h1>

      <div className="row justify-content-start">
        <Card title="Query">
          <p><b>Tissue:</b> {this.props.match.params.tissue}</p>
          <p><b>Entrez Id:</b> {this.props.match.params.gene}</p>
          <p><b>Variant Id:</b> {decodeURIComponent(this.props.match.params.variant)}</p>
        </Card>

        <Card title="Gene Information">
          <p><b>Entrez Id:</b> {this.props.variantDetail.geneEntrezId} </p>
          <p><b>Ensembl Id:</b> {this.props.variantDetail.geneEnsemblId} </p>
          <p><b>Symbol:</b> {this.props.variantDetail.geneSymbol} </p>
          <p><b>Type:</b> {this.props.variantDetail.geneType} </p>
          <p><b>Description:</b> {this.props.variantDetail.geneDescription}</p>
          <p><b>Chromosome:</b> {this.props.variantDetail.geneChrom} </p>
          <p><b>Start:</b> {this.props.variantDetail.geneTSS}</p>
          <p><b>End:</b> {this.props.variantDetail.geneTES} </p>
        </Card>

        <Card title="Variant Information">
          <p><b>Chromosome:</b> {this.props.variantDetail.variantChrom} </p>
          <p><b>Position:</b> {this.props.variantDetail.variantPos} </p>
          <p><b>Reference:</b> {this.props.variantDetail.variantRef} </p>
          <p><b>Alternative:</b> {this.props.variantDetail.variantAlt}</p>
          <p><b>dbSNP:</b> {this.props.variantDetail.variantDbSNPId} </p>
        </Card>

        <Card title="NEPTUNE Allele Frequencies">
          <p><b>Overall Alt. AF:</b> {this.afFormatter(this.props.variantDetail.overallAf)} </p>
          <p><b>AFR Alt. AF:</b> {this.afFormatter(this.props.variantDetail.afrAf)} </p>
          <p><b>AMR Alt. AF:</b> {this.afFormatter(this.props.variantDetail.amrAf)} </p>
          <p><b>ASN Alt. AF:</b> {this.afFormatter(this.props.variantDetail.asnAf)} </p>
          <p><b>EUR Alt. AF:</b> {this.afFormatter(this.props.variantDetail.eurAf)} </p>
        </Card>

        <Card title="1000G Phase 3 Allele Frequencies">
          <p><b>Overall Alt. AF:</b> {this.afFormatter(this.props.variantDetail._1kgOverallAf)} </p>
          <p><b>AFR Alt. AF:</b> {this.afFormatter(this.props.variantDetail._1kgAfrAf)} </p>
          <p><b>AMR Alt. AF:</b> {this.afFormatter(this.props.variantDetail._1kgAmrAf)} </p>
          <p><b>EAS Alt. AF:</b> {this.afFormatter(this.props.variantDetail._1kgEasAf)} </p>
          <p><b>SAS Alt. AF:</b> {this.afFormatter(this.props.variantDetail._1kgSasAf)} </p>
          <p><b>EUR Alt. AF:</b> {this.afFormatter(this.props.variantDetail._1kgEurAf)} </p>
        </Card>

        <Card title="Association">
          <p><b>Beta:</b> { this.props.variantDetail.beta ? this.props.variantDetail.beta.toPrecision(3)  : ""} </p>
          <p><b>t-statistic: </b> {this.props.variantDetail.tStat ? this.props.variantDetail.tStat.toPrecision(3) : ""}</p>
          <p><b>P-value: </b> {pValFormat}</p>
        </Card>
      </div>
      </div>
    )
  }

}


export default GeneAndVariantDetail;
