import { connect } from 'react-redux'
import { setTab, fetchQueryResults, setFilters } from '../actions'
import SearchResult from '../components/SearchResult'
import { withRouter } from 'react-router-dom'

const mapStateToProps = (state, ownProps) => {
  //console.log("SearchResult map state to props")
  return {
    currentTab: state.searchResult.currentTab,
    filters: state.searchResult.filters,
    glomResults: state.searchResult.glomResults,
    tubResults: state.searchResult.tubResults,
    query: ownProps.match.params.query,
    queryType: state.searchResult.queryType
  }
}



const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSetTab: (tab) => {
    dispatch(setTab(tab))
  },

  submitQuery: (query, maxPVal) => {
    dispatch(fetchQueryResults(query, maxPVal))
  },

  handleSetFilters: (filters) => {
    dispatch(setFilters(filters));
  }

})

const SearchResultState = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResult));

export default SearchResultState
