import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import './App.css';
import HeaderState from '../containers/HeaderState'
import SearchFormState from '../containers/SearchFormState'
import SearchResultState from '../containers/SearchResultState'
import GeneAndVariantDetailState from '../containers/GeneAndVariantDetailState'
import About from './About'
import Help from './Help'
import GeneSummaryState from '../containers/GeneSummaryState'

function SearchFormPage(props) {
  //this is needed b/c the SearchForm is in multiple locations
  //each SearchForm has a different state
  return(
      <SearchFormState {...props} stateKey="main"/>
  );
}



class App extends Component {

  render() {
    return (
      <Router>
      <div>
        <HeaderState title="NephVS eQTL Browser" />
        <div className="container">
            <Route exact path="/" render={SearchFormPage}/>
            <Route path="/about" component={About}/>
            <Route path="/help" component={Help}/>
            <Route path="/geneSummary" component={GeneSummaryState}/>
            <Route path={`/searchResult/:query`} component={SearchResultState}/>
            <Route path={`/detail/tissue/:tissue/gene/:gene/variant/:variant`} component={GeneAndVariantDetailState}/>
        </div>
      </div>
      </Router>
    );
  }
}

export default App;
