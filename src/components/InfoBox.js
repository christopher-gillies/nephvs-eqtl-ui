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

        <p> Thank you for visiting the NephVS eQTL browser!
        </p>
        <p>
        This is a database of <i>cis</i>-eQTLs found in the NEPTUNE cohort. We compared variants within 500 kb +- the start and end position of genes. For more information please visit the <Link to="/about"> About</Link> page.
        </p>
        <p>
          To use this resource, please type in a gene symbol, entrezId, or rsid to find a gene or variant of interest  and click Search.
          Alternatively, you may click on the <Link to="/geneSummary"> eQTL Gene Summary</Link> link in the top right of the header page
          to see a list of the genes that we discovered with the strongest genetic regulation.
        </p>
      </div>
    );
  }

}

export default InfoBox;
