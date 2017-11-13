import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest'
import './SearchForm.css'
import PropTypes from 'prop-types'
import QueryService from '../services/QueryService'

const getSuggestionValue = suggestion => suggestion;
const maxSuggestionLength = 5;
const delayTime = 300;

const renderSuggestion = suggestion => (
  <div>
    {suggestion}
  </div>
);

class SearchForm extends Component {

  constructor(props) {
    super(props);
    this.delay = null;
    // This binding is necessary to make `this` work in the callback
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this)
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
  }

  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    let res = [];
    if(inputLength === 0) {
      return res;
    } else {
      for(let i = 0; i < this.props.options.length; i++) {
        let item = this.props.options[i]
        if(item.toLowerCase().slice(0, inputLength) === inputValue) {
          res.push(item);
        }

        if(res.length >= maxSuggestionLength) {
          return res;
        }
      }
    }

    return inputLength === 0 ? [] : this.props.options.filter(gene =>
      gene.toLowerCase().slice(0, inputLength) === inputValue
    );
  }


  onSuggestionsFetchRequested = ({ value }) => {

      clearTimeout(this.delay);
      this.delay = setTimeout(() => {
        this.props.handleSetSuggestions( this.getSuggestions(value) );
      }
      , delayTime)

    };

  onSuggestionsClearRequested = () => {
    this.props.handleSetSuggestions([])
  };


  handleInputChange(event, { newValue }) {
    let query = newValue;
    if(query !== null && query !== "") {
      this.props.handleChange(query)
    } else {
      this.props.handleChange("")
    }
  }

  handleSubmit(event) {
    let query = this.props.query;

    this.props.queryService.validateQuery(query, (jsonRes) => {
      if(jsonRes.status === "Valid") {
        this.props.history.push("/searchResult/" + this.props.query)
        this.props.handleSearchError("");
      } else if(jsonRes.status === "RegionToLarge") {
        this.props.handleSearchError("Regions must be smaller than 5mb")
      } else if(jsonRes.status === "StartGreaterThanEnd") {
        this.props.handleSearchError("The start position must be less than or equal to the end position")
      } else {
        this.props.handleSearchError("Please type a query")
      }
    }, (error) => {
      this.props.handleSearchError("No response from server");
    });

    /*
    if(this.props.query !== "") {
      this.props.history.push("/searchResult/" + this.props.query)
      this.props.handleSearchError("");
    } else {
      this.props.handleSearchError("Please specify search criteria");
    }
    */
    event.preventDefault();
  }


  render() {


    const inputProps = {
      placeholder: 'Type a gene (symbol, Entrez id or Ensembl) or dbSNP identifier',
      value: this.props.query,
      onChange: this.handleInputChange
    };

    let heading = (
      <div className="text-center">
            <h3>Welcome to NephVS eQTL Browser!</h3>
      </div>
    );

    let submit = (
      <div className="text-center">
        <button type="submit" className="btn btn-primary margin-small">Search</button>
      </div>
    )

    let formStyle = "";

    let error = null;


    if(this.props.errorMessage !== "") {
      error = (
        <div className="alert alert-danger" role="alert">
          {this.props.errorMessage}
        </div>);
    }


    if(this.props.header === true) {
      submit = (<button type="submit" className="btn btn-primary">Search</button>)
      heading = null;
      formStyle="form-inline my-2 my-lg-0";
      inputProps.placeholder = "Enter query"

      if(this.props.errorMessage !== "") {
        error = (
            <div className="alert alert-danger form-control m-0 p-2">
              {this.props.errorMessage}
            </div>
          );
      }

    }



    return(
      <div>
      {heading}
      <form onSubmit={this.handleSubmit} className={formStyle}>
        {error}
        <Autosuggest
          suggestions={this.props.suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
        {submit}
      </form>
      </div>
    )
  }

}

SearchForm.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  query: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  queryService: PropTypes.instanceOf(QueryService).isRequired
}

export default SearchForm;
