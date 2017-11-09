import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import './App.css';
import HeaderState from '../containers/HeaderState'
import SearchFormState from '../containers/SearchFormState'
import SearchResultState from '../containers/SearchResultState'
import PairResult from './PairResult'
import About from './About'

function SearchFormPage(props) {
  return(
      <SearchFormState {...props} stateKey="main"/>
  )
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
            <Route path={`/searchResult/:query`} component={SearchResultState}/>
            <Route path={`/pairResult/tissue/:tissue/gene/:gene/variant/:variant`} component={PairResult}/>
        </div>
      </div>
      </Router>
    );
  }
}

export default App;
