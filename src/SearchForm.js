import React, { Component } from 'react';
import Select from 'react-select';
import './SearchForm.css'
import {Button} from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

class SearchForm extends Component {


  constructor(props) {
    super(props);

    this.state = {
      query: ""
    }
    // This binding is necessary to make `this` work in the callback
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(queryVal) {
    if(queryVal !== null && queryVal !== "") {
      this.setState( prevState => ( {
        query: queryVal.value
      }))
    } else {
      this.setState( prevState => ( {
        query: ""
      }))
    }
  }

  handleSubmit(event) {
    if(this.state.query != "") {
      this.props.history.push("/searchResult/" + this.state.query)
    } else {
      alert("Please specify search criteria!")
    }
    event.preventDefault();
  }


  render() {

    let heading = (
      <div className="text-center">
            <h3>Welcome to NephVS eQTL Browser!</h3>
      </div>
    );

    let submit = (
      <div className="text-center">
        <Button type="submit" className="margin-small">Search</Button>
      </div>
    )

    let style = "";

    if(this.props.header === true) {
      submit = (<Button type="submit">Search</Button>)
      heading = null;
      style="inline-search"
    }

    return(
      <div>
      {heading}
      <form onSubmit={this.handleSubmit}>
        <div className={style}>
        <Select
            className="width-100"
            name="form-field-name"
            options={this.props.options}
            onChange={this.handleChange}
            placeholder="Search for a gene or variant..."
            arrowRenderer={() => null}
            noResultsText={false}
            value={this.state.query}
        />
        </div>
        {submit}
      </form>
      </div>
    )
  }

}

//https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/withRouter.md
const SearchFormWithRouter = withRouter(SearchForm)
export default SearchFormWithRouter;
