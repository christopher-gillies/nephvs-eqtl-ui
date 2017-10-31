import { connect } from 'react-redux'
import SearchForm from '../components/SearchForm'
import { setSearchQuery } from '../actions'
import { setSuggestions } from '../actions'
import { withRouter } from 'react-router'

const mapStateToProps = (state, ownProps) => ({
  query: state.searchForm.query,
  suggestions: state.searchForm.suggestions,
  showErrorMessage: state.searchForm.showErrorMessage,
  errorMessage: state.searchForm.errorMessage
})


const mapDispatchToProps = (dispatch, ownProps) => ({
  handleChange: (query) => {
    dispatch(setSearchQuery(query))
  },
  handleSetSuggestions: (suggestions) => {
    dispatch(setSuggestions(suggestions))
  }
})

//add with router so that we can get link information always
const SearchFormState = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SearchForm))

export default SearchFormState
