import React, { Component } from 'react';
import Card from './Card'
import './Terms.css'

//import { Link } from 'react-router-dom'
class Terms extends Component {
  handleLinkClick = (e) => {
    e.preventDefault()
    window.open(e.target.href)
  }
  render() {
    return(
      <div className="text-center">
      <h1>Terms of use and Citation in publications</h1>
      <Card title="Terms of use" size="col-lg">
        <p>We have released the nephQTL data openly and publicly for downloading and/or data searches.</p>

        <p>
          The data are available under the <a onClick={this.handleLinkClick} href="http://opendatacommons.org/licenses/odbl/1.0/">ODC Open Database License (ODbL)</a> a summary is available <a onClick={this.handleLinkClick} href="http://opendatacommons.org/licenses/odbl/summary/">here</a>: you are free to share and modify the NephQTL data so long as you attribute any public use of the database, or works produced from the database; keep the resulting data-sets open; and offer your shared or adapted version of the dataset under the same ODbL license.
        </p>
      </Card>

      <Card title="Citation in publications" size="col-lg">
        <p>
          We encourage the use and publication of results generated from these data. We request that if you use data from NephQTL browser cite that you cite our paper, “An eQTL landscape of kidney tissue in human nephrotic syndrome” currently published in preprint from on <a onClick={this.handleLinkClick} href="https://www.biorxiv.org/content/early/2018/03/14/281162">bioRxiv</a>.
        </p>
      </Card>
      </div>
    )
  }
}

export default Terms;
