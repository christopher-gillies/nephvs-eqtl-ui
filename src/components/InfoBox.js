import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom'


class InfoBox extends Component {
  handleLinkClick = (e) => {
    e.preventDefault()
    window.open(e.target.href)
  }

  render() {

    return (

      <div className="m-5">
      <hr />
        <h5>Brief introduction</h5>

        <p> Thank you for visiting the NephQTL browser!
        </p>
        <p>
        This is a database of <i>cis</i>-eQTLs of the glomerular and tubulointerstitial tissues of the kidney found in 187 participants in the NEPTUNE cohort. For more information please visit the <Link to="/about"> About</Link> page.
        </p>
        <p>
          To use this resource, please type in a gene symbol, entrezId, or rsid to find a gene or variant of interest  and click Search.
          Alternatively, you may click on the <Link to="/geneSummary"> eQTL Gene Summary</Link> link in the top right of the header page
          for a list of the most significant eQTLs in glomerulus and tubulointerstitium.
        </p>

        <h5>Citation</h5>
        <p>"An eQTL landscape of kidney tissue in human nephrotic syndrome"</p>
        <p>Christopher E. Gillies, Rosemary Putler, Rajasree Menon, Edgar Otto, Kalyn Yasutake, Viji Nair, Paul Hoover, David Lieb, Shuqiang Li, Sean Eddy, Damian Fermin, Nephrotic Syndrome Study Network (NEPTUNE), Nir Hacohen, Krzysztof Kiryluk, William Wen, Matthias Kretzler, Matthew G. Sampson </p>
        <p>You can view the paper on bioRxiv <a onClick={this.handleLinkClick} href="https://www.biorxiv.org/content/early/2018/03/14/281162">here</a>. </p>

        <h5>Full data download</h5>
        <p>You can download the glomerulus and tubulointerstitial Matrix eQTL results <a onClick={this.handleLinkClick} href="https://umich.box.com/s/6jrvgmdh0ppwqvgriuvijiau0xcb4ohm">here.</a></p>
      </div>
    );
  }

}

export default InfoBox;
