import { connect } from 'react-redux'
import SearchForm from '../components/SearchForm'
import { setSearchQuery, setSuggestions, setSearchError, setFilters } from '../actions'
import QueryService from '../services/QueryService'
import { withRouter } from 'react-router-dom'

const mapStateToProps = (state, ownProps) => {
  return ({
    query: state.searchForm[ownProps.stateKey].query,
    suggestions: state.searchForm[ownProps.stateKey].suggestions,
    errorMessage: state.searchForm[ownProps.stateKey].errorMessage,
    options: state.gene.symbols,
    isFetching: state.gene.isFetching,
    queryService: new QueryService(),
  });
}


const mapDispatchToProps = (dispatch, ownProps) => ({
  handleChange: (query) => {
    dispatch(setSearchQuery(query, ownProps.stateKey))
  },
  handleSetSuggestions: (suggestions) => {
    dispatch(setSuggestions(suggestions, ownProps.stateKey))
  },
  handleSearchError: (errorMessage) => {
    dispatch(setSearchError(errorMessage, ownProps.stateKey))
  },
  handleSetMaxPVal: (maxPVal) => {
    dispatch(setFilters({
      visible: false,
      maxPVal: 0.05
    }));
  }

})

//add with router so that we can get link information always
const SearchFormState = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchForm));

export default SearchFormState
