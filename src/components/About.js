import React, { Component } from 'react';
import Card from './Card'
import './About.css'
import pca from '../pca.png'
//import { Link } from 'react-router-dom'
class About extends Component {
  handleLinkClick = (e) => {
    e.preventDefault()
    window.open(e.target.href)
  }
  render() {
    return(
      <div className="text-center">
      <h1>About the NephVS eQTL Browser</h1>

      <Card title="Cohort information" size="col-lg">
        <p>Please visit the NEPTUNE cohort <a onClick={this.handleLinkClick} href="http://www.neptune-study.org/">website</a></p>
        <b>Relevant Publication: </b> <a onClick={this.handleLinkClick} href="https://www.ncbi.nlm.nih.gov/pubmed/23325076">here</a>
        <br />
        <h3>NEPTUNE patient characteristics for subjects in eQTL</h3>
        <br />
        <div className="text-center">
          <table className="table table-striped small">
            <thead>
            <tr className="borderBottom">
              <th>Characteristic</th>
              <th>Either Expression (N=187)</th>
              <th>Glom Expression (N=136)</th>
              <th>Tub Expression (N=166)</th>
            </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                <b>Age (y)</b>
                </td>
                <td>
                  36 (17-56)
                </td>
                <td>
                  34.5 (17-55)
                </td>
                <td>
                  36 (17-56)
                </td>
              </tr>

              <tr>
                <td>
                <b>Pediatric</b>
                </td>
                <td>
                  51 (27%)
                </td>
                <td>
                  39 (29%)
                </td>
                <td>
                  46 (28%)
                </td>
              </tr>

              <tr>
                <td>
                <b>Age of Onset (y)</b>
                </td>
                <td>
                  36 (17-56)
                </td>
                <td>
                  34.5 (17-55)
                </td>
                <td>
                  36 (17-56)
                </td>
              </tr>

              <tr>
                <td>
                <b>Duration of disease (mon.)</b>
                </td>
                <td>
                  4 (1-18)
                </td>
                <td>
                  4 (1-17.8)
                </td>
                <td>
                  4 (1-18)
                </td>
              </tr>

              <tr>
                <td>
                <b>Male</b>
                </td>
                <td>
                  131 (70%)
                </td>
                <td>
                  96 (71%)
                </td>
                <td>
                  115 (85%)
                </td>
              </tr>

              <tr>
                <td>
                <b>Histopath</b>
                </td>
                <td>
                  &nbsp;
                </td>
                <td>
                  &nbsp;
                </td>
                <td>
                  &nbsp;
                </td>
              </tr>

              <tr>
                <td>
                &nbsp; FSGS
                </td>
                <td>
                  55 (29%)
                </td>
                <td>
                  35 (26%)
                </td>
                <td>
                  50 (30%)
                </td>
              </tr>

              <tr>
                <td>
                &nbsp; MCD
                </td>
                <td>
                  37 (20%)
                </td>
                <td>
                  28 (21%)
                </td>
                <td>
                  35 (21%)
                </td>
              </tr>

              <tr>
                <td>
                &nbsp; MN
                </td>
                <td>
                  41 (22%)
                </td>
                <td>
                  36 (26%)
                </td>
                <td>
                  35 (21%)
                </td>
              </tr>

              <tr>
                <td>
                &nbsp; Other
                </td>
                <td>
                  54 (29%)
                </td>
                <td>
                  37 (27%)
                </td>
                <td>
                  46 (28%)
                </td>
              </tr>

              <tr>
                <td>
                <b>Baseline characteristics</b>
                </td>
                <td>
                  &nbsp;
                </td>
                <td>
                  &nbsp;
                </td>
                <td>
                  &nbsp;
                </td>
              </tr>

              <tr>
                <td>
                &nbsp; eGFR
                </td>
                <td>
                  85.2 (56.4-105.6)
                </td>
                <td>
                  83.8 (65.7-107.6)
                </td>
                <td>
                  82.4 (54.4-105.5)
                </td>
              </tr>

              <tr>
                <td>
                &nbsp; UPCR
                </td>
                <td>
                  2.2 (0.8-4.2)
                </td>
                <td>
                  2 (0.6-3.9)
                </td>
                <td>
                  2.1 (0.8-3.9)
                </td>
              </tr>

              <tr>
                <td>
                &nbsp; Complete Remission
                </td>
                <td>
                  108 (58%)
                </td>
                <td>
                  83 (61%)
                </td>
                <td>
                  96 (58%)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="small"> Data presented as median (interquartile range) for quantitative variables and as count (%) for categorical characteristics. </p>

        <img alt="pca" src={pca}></img>
      </Card>

      <Card title="Data processing pipeline" size="col-lg">
        <p> <b> Data </b> </p>
        <p>
        For a subset of 323 NEPTUNE participants, 4x whole genome sequencing was performed.  A subset of these patients had genome-wide transcriptome data generated from GLOM and/or TI microdissected biopsies, with expression quantified using the Affymetrix 2.1 ST chip.
        Probe expression from this array was computed using a Custom CDF file from BrainArray for EntrezG, version 19.  Expression was normalized across genes using robust multi-array average (RMA)
        </p>
        <p> <b>Alignment:</b> <a onClick={this.handleLinkClick} href="http://genome.sph.umich.edu/wiki/GotCloud">GotCloud: 1.12.3</a> (BWA 0.7.5a-r405) </p>
        <p> <b>Single nucleotide variants calling:</b> <a onClick={this.handleLinkClick} href="http://genome.sph.umich.edu/wiki/GotCloud">GotCloud: 1.12.3</a> </p>
        <p> <b>Indels:</b> <a onClick={this.handleLinkClick} href="https://software.broadinstitute.org/gatk/">GATK 2.8.1</a> UnifiedGenotyper following GATK Best Practices </p>
        <p> <b>Deletions:</b> <a onClick={this.handleLinkClick} href="http://software.broadinstitute.org/software/genomestrip/">GenomeSTRiP 1.04</a> </p>
        <p> <b>eQTL Mapping:</b>  <a onClick={this.handleLinkClick} href="https://www.ncbi.nlm.nih.gov/pubmed/22492648">Matrix eQTL</a> </p>
        <p>
        Eligible variants considered were those with an allele frequency (AF) &gt; 0.03 in the NEPTUNE cohort. Variants were considered to be in the cis region of those genes that had any nucleotide in a 1MB region centered on the variant (500kB flanking region). We adjusted for age, sex, <a onClick={this.handleLinkClick} href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3398141/">PEER</a> factors, and principal components. PEER factors were created utilizing the PEER framework as previously described, adjusting for patient age, sex, and microarray batch. We used 25 PEER factors in the TUB and 31 PEER factors in the GLOM.
        We adjusted for the number of PEER factors that maximized significant eQTLs at an arbitrary p-value threshold and portion of the genome.
        For both tissues, we adjusted for four PCs.
        </p>

        <p> <b>Fine Mapping:</b> <a onClick={this.handleLinkClick} href="https://projecteuclid.org/euclid.aoas/1475069621">TORUS</a> and <a onClick={this.handleLinkClick} href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4908152/"> DAP </a> </p>
      </Card>

      <Card title="Download Full matrix eQTL results" size="col-lg">
        <p>You can download the tubulointerstitial Matrix eQTL results <a href="_blank">here.</a></p>
        <p>You can download the glomerular Matrix eQTL results <a href="_blank">here.</a></p>
      </Card>

      <Card title="Lab website" size="col-lg">
        Please visit our lab <a onClick={this.handleLinkClick} href="https://sites.google.com/a/umich.edu/sampson_lab/">here.</a>
      </Card>
      </div>
    )
  }
}

export default About;
