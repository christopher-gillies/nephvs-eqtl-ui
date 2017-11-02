import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest'
import './SearchForm.css'
import PropTypes from 'prop-types'
const getSuggestionValue = suggestion => suggestion.value;


const renderSuggestion = suggestion => (
  <div>
    {suggestion.value}
  </div>
);

class SearchForm extends Component {

  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this)
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
  }

  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : this.props.options.filter(gene =>
      gene.value.toLowerCase().slice(0, inputLength) === inputValue
    );
  }

  onSuggestionsFetchRequested = ({ value }) => {
      this.props.handleSetSuggestions( this.getSuggestions(value) )
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
    if(this.props.query !== "") {
      this.props.history.push("/searchResult/" + this.props.query)
    } else {
      alert("Please specify search criteria!")
    }
    event.preventDefault();
  }


  render() {


    const inputProps = {
      placeholder: 'Type a gene or dbSNP identifier',
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

    if(this.props.header === true) {
      submit = (<button type="submit" className="btn btn-primary">Search</button>)
      heading = null;
      formStyle="form-inline my-2 my-lg-0";
      inputProps.placeholder = "Enter query"
    }

    return(
      <div>
      {heading}
      <form onSubmit={this.handleSubmit} className={formStyle}>
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
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired
  })).isRequired,
  query: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
}

export default SearchForm;
