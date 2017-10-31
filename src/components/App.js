import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import './App.css';
import Header from './Header'
import SearchFormState from '../containers/SearchFormState'
import SearchResult from './SearchResult'
import About from './About'


function SearchFormPage(props) {
  let options = [
    { value: 'INF2' },
    { value: 'INF1'},
    { value: 'WT1' }
  ];

  return(
      <SearchFormState {...props} options={options}/>
  )
}



class App extends Component {
  render() {
    let options = [
      { value: 'INF2' },
      { value: 'WT1' }
    ];

    return (
      <Router>
      <div>
        <Header title="NephVS eQTL Browser" showSearch={true} options={options} />
        <div className="container">
            <Route exact path="/" render={SearchFormPage}/>
            <Route path="/about" component={About}/>
            <Route path={`/searchResult/:query`} component={SearchResult}/>
        </div>
      </div>
      </Router>
    );
  }
}

export default App;
