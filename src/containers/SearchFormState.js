import { connect } from 'react-redux'
import SearchForm from '../components/SearchForm'
import { setSearchQuery } from '../actions'
import { setSuggestions } from '../actions'
import { setSearchError } from '../actions'
import { withRouter } from 'react-router'

const mapStateToProps = (state, ownProps) => {
  return ({
    query: state.searchForm[ownProps.stateKey].query,
    suggestions: state.searchForm[ownProps.stateKey].suggestions,
    errorMessage: state.searchForm[ownProps.stateKey].errorMessage
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
  }
})

//add with router so that we can get link information always
const SearchFormState = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SearchForm))

export default SearchFormState
