import { Component } from 'react';
const loadScript = require('load-script');
const DEFAULT_SCRIPT = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=TeX-AMS_CHTML';

class MathJaxContainer extends Component {


  onLoad = (err) => {
    if(window.MathJax) {
      this.MathJax = window.MathJax;
      this.MathJax.Hub.Config({
        tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}
      });
    }
  }

  componentDidMount() {
    if(!window.MathJax) {
      loadScript(DEFAULT_SCRIPT, this.onLoad);
    }
  }

  render() {
    return this.props.children;
  }
}

export default MathJaxContainer;
