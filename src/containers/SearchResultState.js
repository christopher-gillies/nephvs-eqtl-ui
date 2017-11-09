import { connect } from 'react-redux'
import { setTab, fetchQueryResults } from '../actions'
import SearchResult from '../components/SearchResult'
import { withRouter } from 'react-router-dom'

const mapStateToProps = (state, ownProps) => {
  //console.log("SearchResult map state to props")
  return {
    currentTab: state.searchResult.currentTab,
    glomResults: state.searchResult.glomResults,
    tubResults: state.searchResult.tubResults,
    query: ownProps.match.params.query
  }
}



const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSetTab: (tab) => {
    dispatch(setTab(tab))
  },

  submitQuery: (query) => {
    dispatch(fetchQueryResults(query))
  }

})

const SearchResultState = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResult));

export default SearchResultState
