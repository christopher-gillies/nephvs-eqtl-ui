import React, { Component } from 'react';
import Card from './Card'
//import BoxPlot from './BoxPlot'
import BoxPlotCore from './BoxPlotCore'
import GTExService from '../services/GTExService'

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


  handleLinkClick = (e) => {
    e.preventDefault()
    window.open(e.target.href)
  }

  afFormatter = (af) => {
    if(af) {
      return (af * 100).toPrecision(3) + "%"
    }
  }

  render() {
    const variantDetail = this.props.variantDetail;
    const boxPlotMeta = variantDetail.boxPlotMeta;
    const gtexSerivce = new GTExService();

    let pValFormat = null;
    if(variantDetail.pVal !== null && variantDetail.pVal !== undefined) {
      if(variantDetail.pVal < 0.001) {
        pValFormat = variantDetail.pVal.toExponential(3);
      } else {
        pValFormat = variantDetail.pVal.toPrecision(3);
      }
    }
    console.log(this.props)

    //let dataForBoxPlot = [];
    const allelesStr = [
      variantDetail.variantRef + "/" + variantDetail.variantRef + " (Coded: 0)",
      variantDetail.variantRef + "/" + variantDetail.variantAlt + " (Coded: 1)",
      variantDetail.variantAlt + "/" + variantDetail.variantAlt + " (Coded: 2)"
    ]

    /*
    if(variantDetail.exprAndGtForSubs) {
      dataForBoxPlot = variantDetail.exprAndGtForSubs.map( d => {

          let obj = {group: allelesStr[d.gt], y: d.expr};
          return obj;
        }
      );
    }
    */



    let xlab = null;
    if(variantDetail.variantDbSNPId) {
        xlab = "Genotypes for " + variantDetail.variantDbSNPId;
    } else {
        xlab = "Genotypes for " + variantDetail.variantStr;
    }

    let ylab = null;
    let ylabItalic = "";

    let tissueTextExpr = null;
    if(this.props.match.params.tissue === "tub" || this.props.match.params.tissue === "tube") {
      tissueTextExpr = "tubulointerstitial";
    } else {
      tissueTextExpr = "glomerular";
    }

    if(variantDetail.geneSymbol) {
      ylab = "Rank normalized, adjusted " + tissueTextExpr + " expression for ";
      ylabItalic = variantDetail.geneSymbol;
    } else {
      ylab = "Rank normalized, adjusted " + tissueTextExpr + " expression for " + variantDetail.geneEntrezId;
    }

    let title = null;
    let tissueText = null;
    if(this.props.match.params.tissue === "tub" || this.props.match.params.tissue === "tube") {
      tissueText = "tubulointerstitium";
    } else {
      tissueText = "glomerulus";
    }
    if(variantDetail.variantDbSNPId && variantDetail.geneSymbol) {
      title = (<span> Gene and variant detail for <i> {variantDetail.geneSymbol} </i> and {variantDetail.variantDbSNPId} in {tissueText}</span>);
    } else if(variantDetail.geneSymbol) {
      title = (<span> Gene and variant detail for <i> {variantDetail.geneSymbol} </i> and {variantDetail.variantStr} in {tissueText}</span>);
    } else if(variantDetail.variantDbSNPId) {
      title = (<span> Gene and variant detail for <i> {variantDetail.geneEntrezId} </i> and {variantDetail.variantDbSNPId} in {tissueText}</span>);
    } else {
      title = (<span> Gene and variant detail for <i> {variantDetail.geneEntrezId} </i> and {variantDetail.variantStr} in {tissueText}</span>);
    }


    let boxplotFilename = variantDetail.geneEntrezId + "_" + variantDetail.variantStr + "_" + this.props.match.params.tissue + ".svg";

    let isX = false;
    if(variantDetail) {
      isX = (variantDetail.geneChrom === "X");
    }

    let note = null;
    if(isX) {
      note=(<small>*Please note that the the allele frequency is computed as 2 times the number of homozygous alternative subjects +
            the number of heterozygotes divided by 2 times the number of subjects. On the X-chromosome, males with one allele were coded as 2. Therefore, for the X chromosome, this allele frequency is hidden because it is incorrect.
        </small>
      );
    }

    let neptuneAf = null;
    if(!isX) {
      neptuneAf = (
        <Card title="NEPTUNE Allele Frequencies">
          <p><b>Overall Alt. AF:</b> {this.afFormatter(variantDetail.overallAf)} </p>
          <p><b>AFR Alt. AF:</b> {this.afFormatter(variantDetail.afrAf)} </p>
          <p><b>AMR Alt. AF:</b> {this.afFormatter(variantDetail.amrAf)} </p>
          <p><b>ASN Alt. AF:</b> {this.afFormatter(variantDetail.asnAf)} </p>
          <p><b>EUR Alt. AF:</b> {this.afFormatter(variantDetail.eurAf)} </p>
        </Card>
      );
    }

    let boxPlotRender = null;

    if(boxPlotMeta) {
      boxPlotRender = (
        <div>
          <BoxPlotCore groupInfos={boxPlotMeta.groupInfos}
            groupKeys={boxPlotMeta.groupKeys} minY={boxPlotMeta.minY}
            maxY={boxPlotMeta.maxY} boxWidth="150" width="650" height="650" xlab={xlab} ylab={ylab} ylabItalic={ylabItalic}
            filename={boxplotFilename} />
          </div>
      );
    }

    /*****************
    Update 4-17-2018
    Add GTExLink for rsids
    ******************/

    let gtexLink = null;
    if(variantDetail.variantDbSNPId) {
      gtexLink = (
        <span>
        {variantDetail.variantDbSNPId} <a href={gtexSerivce.buildUrl(variantDetail.variantDbSNPId)} onClick={this.handleLinkClick}>
        (View on GTEx)
        </a>
        </span>
      );
    } else {
      gtexLink = (variantDetail.variantDbSNPId);
    }

    return(
      <div className="container-fluid">
      <div className="text-center"><h3>{title}</h3></div>

      <div className="text-center">
      { /*
      <BoxPlot data={dataForBoxPlot} filename={boxplotFilename}
        groupOrder={allelesStr} width="650" height="650" xlab={xlab} ylab={ylab} ylabItalic={ylabItalic} boxWidth="150"/>

      */
      }
      { boxPlotRender }
      </div>

      <div className="row justify-content-start">
        <Card title="Query">
          <p><b>Tissue:</b> {tissueText}</p>
          <p><b>Entrez Id:</b> {this.props.match.params.gene}</p>
          <p><b>Variant Id:</b> {decodeURIComponent(this.props.match.params.variant)}</p>
        </Card>

        <Card title="Gene Information">
          <p><b>Entrez Id:</b> {variantDetail.geneEntrezId} </p>
          <p><b>Ensembl Id:</b> {variantDetail.geneEnsemblId} </p>
          <p><b>Symbol:</b> {variantDetail.geneSymbol} </p>
          <p><b>Type:</b> {variantDetail.geneType} </p>
          <p><b>Description:</b> {variantDetail.geneDescription}</p>
          <p><b>Chromosome:</b> {variantDetail.geneChrom} </p>
          <p><b>Start:</b> {variantDetail.geneTSS}</p>
          <p><b>End:</b> {variantDetail.geneTES} </p>
        </Card>

        <Card title="Variant Information">
          <p><b>Chromosome:</b> {variantDetail.variantChrom} </p>
          <p><b>Position:</b> {variantDetail.variantPos} </p>
          <p><b>Reference:</b> {variantDetail.variantRef} </p>
          <p><b>Alternative:</b> {variantDetail.variantAlt}</p>
          <p><b>dbSNP:</b> { gtexLink } </p>
          <p><b>Number of reference {!isX ? "homozygotes" : "homozygotes/hemizygotes"}:</b> {allelesStr[0]} = {variantDetail.homRef} </p>
          <p><b>Number of heterozygotes:</b> {allelesStr[1]} = {variantDetail.het} </p>
          <p><b>Number of alternative {!isX ? "homozygotes" : "homozygotes/hemizygotes"} :</b> {allelesStr[2]} = {variantDetail.homAlt} </p>
        </Card>

        { neptuneAf }

        <Card title="1000G Phase 3 Allele Frequencies">
          <p><b>Overall Alt. AF:</b> {this.afFormatter(variantDetail._1kgOverallAf)} </p>
          <p><b>AFR Alt. AF:</b> {this.afFormatter(variantDetail._1kgAfrAf)} </p>
          <p><b>AMR Alt. AF:</b> {this.afFormatter(variantDetail._1kgAmrAf)} </p>
          <p><b>EAS Alt. AF:</b> {this.afFormatter(variantDetail._1kgEasAf)} </p>
          <p><b>SAS Alt. AF:</b> {this.afFormatter(variantDetail._1kgSasAf)} </p>
          <p><b>EUR Alt. AF:</b> {this.afFormatter(variantDetail._1kgEurAf)} </p>
        </Card>

        <Card title="Association">
          <p><b>Beta:</b> { variantDetail.beta ? variantDetail.beta.toPrecision(3)  : ""} </p>
          <p><b>t-statistic: </b> {variantDetail.tStat ? variantDetail.tStat.toPrecision(3) : ""}</p>
          <p><b>P-value: </b> {pValFormat}</p>
        </Card>
      </div>
      { note }
      </div>
    )
  }

}


export default GeneAndVariantDetail;
