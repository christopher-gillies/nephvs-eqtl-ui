import React, { Component } from 'react';

class GeneSummary extends Component {

    onTabClick = (tab) => {
      this.props.handleSetTab(tab)
    }

    render() {

      return (
        <div>
          <h1>Result for: <span className={this.props.queryType === "GeneSymbol" ? "font-italic" : ""}>
          {this.props.queryType === "GeneSymbol" ? this.props.query.toUpperCase() : this.props.query}</span></h1>

          <div className="border">
            <ul className="nav nav-tabs">
              <li onClick={() => this.onTabClick('glom')} className="nav-item"><a className={ this.props.currentTab === "glom" ? "nav-link active" : "nav-link"}>Glomerulus</a></li>
              <li onClick={() => this.onTabClick('tub')} className="nav-item"><a className={ this.props.currentTab === "tub" ? "nav-link active" : "nav-link"}>Tubulointerstitial</a></li>
            </ul>
            <br />
          </div>
          <br />
        </div>
      );
    }
}

export default GeneSummary;
