import React, { Component } from 'react';
const loadScript = require('load-script');
const DEFAULT_SCRIPT = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=TeX-MML-AM_CHTML';


//import { Link } from 'react-router-dom'
class Help extends Component {
  handleLinkClick = (e) => {
    e.preventDefault()
    window.open(e.target.href)
  }

  componentDidMount() {
     const { script } = this.props;

     //if (!script) {
      //   return this.onLoad();
     //}

     loadScript(DEFAULT_SCRIPT, this.onLoad);
  }

  onLoad = (err) => {
    const { options } = this.props;
    const Math = window.MathJax;
    console.log(Math)


    //this.setState({
    //    loaded: true
    //});
  }

  render() {
    return (
      <div>

        <a href="#MatrixEQTL"> </a>
        <h3>Matrix eQTL results</h3>


        <a href="#DAP"> </a>
        <h3>Understanding DAP</h3>
      </div>
    );
  }
}

export default Help;
