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
        <h5>Brief Introduction</h5>

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
      </div>
    );
  }

}

export default InfoBox;
