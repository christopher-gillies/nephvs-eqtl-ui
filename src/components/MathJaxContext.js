import React, { Component } from 'react';

//import { Link } from 'react-router-dom'
class MathJaxContext extends Component {

  componentDidMount() {
    if(window.MathJax) {
      window.MathJax.Hub.Typeset(this.ref);
    }
  }

  componentDidUpdate() {
    if(window.MathJax) {
      window.MathJax.Hub.Typeset(this.ref);
    }
  }

  render() {
    const contextWrapper = this.props.inline ? "$" : "$$"
    const input = this.props.input;

    let context = contextWrapper + input + contextWrapper;

    return(<span ref={ref => this.ref = ref}>{context}</span>)
  }
}

export default MathJaxContext;
