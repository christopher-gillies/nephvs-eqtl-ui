import { connect } from 'react-redux'
import { setTab } from '../actions'
//import { withRouter } from 'react-router'
import SearchResult from '../components/SearchResult'

const mapStateToProps = (state, ownProps) => {
  //console.log("SearchResult map state to props")
  return {
    currentTab: state.searchResult.currentTab,
    query: ownProps.match.params.query
  }
}



const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSetTab: (tab) => {
    dispatch(setTab(tab))
  },
})

const SearchResultState = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResult)

export default SearchResultState
