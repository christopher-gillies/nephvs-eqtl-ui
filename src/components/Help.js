import React, { Component } from 'react';
import MathJaxContainer from './MathJaxContainer'
import MathJaxContext from './MathJaxContext'

//import { Link } from 'react-router-dom'
class Help extends Component {
  handleLinkClick = (e) => {
    e.preventDefault()
    window.open(e.target.href)
  }

  render() {
    return (
      <div>
        <MathJaxContainer>
        <a href="#MatrixEQTL"> </a>
        <h3>Matrix eQTL Result Table Columns</h3>
        <table className="table table-striped small">
          <thead>
          <tr className="borderBottom">
            <th>Field</th>
            <th>Description</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>
            Entrez Id
            </td>
            <td>
            The numeric gene indentifer from <a href="https://www.ncbi.nlm.nih.gov/gene" onClick={this.handleLinkClick}> NCBI	&lsquo;s Gene database </a>
            </td>
          </tr>
          <tr>
            <td>
            Gene Symbol
            </td>
            <td>
            The latest gene symbol assigned to the Entrez Id as of 8/3/2017
            </td>
          </tr>
          <tr>
            <td>
            dbSNPId
            </td>
            <td>
            The variant identifier <a href="https://www.ncbi.nlm.nih.gov/projects/SNP/" onClick={this.handleLinkClick}>dbSNP</a> corresponding to the chromosome and position of the variant of interest in hg19.
            </td>
          </tr>
          <tr>
            <td>
            Chr:pos
            </td>
            <td>
            The chromosome and position for this variant in hg19
            </td>
          </tr>
          <tr>
            <td>
            Ref.
            </td>
            <td>
            The reference allele in hg19
            </td>
          </tr>
          <tr>
            <td>
            Alt.
            </td>
            <td>
            The alternative allele in this cohort
            </td>
          </tr>
          <tr>
            <td>
            Alt. AF
            </td>
            <td>
            The alternative allele frequency in subjects with either glomerular or tubulointerstitium expression data and genetic data
            </td>
          </tr>
          <tr>
            <td>
            Beta
            </td>
            <td>
              The estimated regression coefficient from MatrixEQTL
            </td>
          </tr>
          <tr>
            <td>
            t-statistic
            </td>
            <td>
              The Beta coefficient divided by estimated standard error
            </td>
          </tr>
          <tr>
            <td>
            P-value
            </td>
            <td>
              If the null hypothesis were true (Beta = 0), then the p-value corresponds to the probability of obtaining the t-statistic that we observed or a more extreme one.
            </td>
          </tr>
          </tbody>
        </table>

        <a href="#DAP"> </a>
        <h3>Understanding DAP</h3>
        <p>Deterministic Approximation of Posteriors (<a onClick={this.handleLinkClick} href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4908152/">DAP</a>) is an efficient Bayesian method for multi-SNP fine mapping analysis.</p>
        The inferential procedure for DAP is:
        <ol>
          <li>Estimate prior probability of variant association using distance transcription start sites and empirical distribution of observed test statistics (<a onClick={this.handleLinkClick} href="https://projecteuclid.org/euclid.aoas/1475069621">TORUS</a>).  </li>
          <li>Screen candidate loci for QTLs</li>
          <li>Perform multi-variant fine mapping for high priority loci</li>
        </ol>
        <p>
        Within a particular locus, DAP computes the posterior probability for candidate regression models given the observed data and prior distribution. The models are constructed while taking into account LD by clustering high LD variants together so that variants with high LD variants will not be selected together.
        Using these probabilities, we can compute the posterior inclusion probabilities (PIP) of variants, and clusters of variants. The PIP can be interpreted as the probability that a variant or cluster of variants is associated with gene expression.
        </p>

        <h5>Gene-level summary table</h5>
        <table className="table table-striped small">
          <thead>
            <tr className="borderBottom">
              <th>Field</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
              Gene-level FDR
              </td>
              <td>
              Gene-level false discovery rate: When the genes are ranked from smallest to largest by the probability of no eQTL, then this value corresponds to the expected fraction of genes that have no eQTL at this index in the ranked list.
              </td>
            </tr>
            <tr>
              <td>
              Probability of no eQTL
              </td>
              <td>
              This is defined by the model that includes no variants. One minus this value is the probability that there is at least one variant at this locus
              </td>
            </tr>
            <tr>
              <td>
              Expected # of eQTLs
              </td>
              <td>
              This value is equal to <MathJaxContext input={"\\sum_{v \\in V} PIP_v"} inline={true}/> where <MathJaxContext input={"V"} inline={true}/> is the set of all variants at this locus and <MathJaxContext input={"PIP_v"} inline={true}/> is the PIP for variant <i>v</i>.
              This value can be thought as the expected number of independent eQTLs at this locus.
              </td>
            </tr>
            <tr>
              <td>
                Number of clusters
              </td>
              <td>
              The number of clusters at this locus.
              </td>
            </tr>
          </tbody>
        </table>

        <h5>DAP Fine Mapping Table</h5>

        <table className="table table-striped small">
          <thead>
          <tr className="borderBottom">
            <th>Field</th>
            <th>Description</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>
            Entrez Id
            </td>
            <td>
            Same as above
            </td>
          </tr>
          <tr>
            <td>
            Gene Symbol
            </td>
            <td>
              Same as above
            </td>
          </tr>
          <tr>
            <td>
            dbSNPId
            </td>
            <td>
            Same as above
            </td>
          </tr>
          <tr>
            <td>
            Chr:pos
            </td>
            <td>
            Same as above
            </td>
          </tr>
          <tr>
            <td>
            Ref.
            </td>
            <td>
            Same as above
            </td>
          </tr>
          <tr>
            <td>
            Alt.
            </td>
            <td>
            Same as above
            </td>
          </tr>
          <tr>
            <td>
            Alt. AF
            </td>
            <td>
            Same as above
            </td>
          </tr>
          <tr>
            <td>
            Variant PIP
            </td>
            <td>
              Variant PIP <MathJaxContext input={" = \\sum_{m \\in M_v} P(m | D)"} inline={true}/> where <MathJaxContext input={"M_v"} inline={true} /> is the set of models including this variant and <MathJaxContext input={"P(m|D)"} inline={true}/> is the probability of the model given the data.
            </td>
          </tr>
          <tr>
            <td>
              Cluster #
            </td>
            <td>
              The numeric identifier for the cluster for which this variant belongs
            </td>
          </tr>
          <tr>
            <td>
            Cluster PIP
            </td>
            <td>
              Cluster PIP <MathJaxContext input={" = \\sum_{v \\in C} PIP_v"} inline={true}/> where <MathJaxContext input={"C"} inline={true} /> is the set of variants in this cluster and <MathJaxContext input={"PIP_v"} inline={true}/> is the posterior inclusion probability of variant <i>v</i>.
            </td>
          </tr>
          <tr>
            <td>
              # of variants in cluster
            </td>
            <td>
              This is the number of variants in this cluster.
            </td>
          </tr>
          </tbody>
        </table>
      </MathJaxContainer>
      </div>
    );
  }
}

export default Help;
