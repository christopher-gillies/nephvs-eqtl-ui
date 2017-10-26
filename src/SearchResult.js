import React, { Component } from 'react';
import './SearchForm.css'

class SearchResult extends Component {

  render() {

    return(
      <h1>Result for: {this.props.match.params.query}</h1>
    )
  }

}


export default SearchResult;
