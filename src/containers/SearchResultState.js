import { connect } from 'react-redux'
import { setTab } from '../actions'
import { withRouter } from 'react-router'
import SearchResult from '../components/SearchResult'

const mapStateToProps = (state, ownProps) => ({
  currentTab: state.searchResult.currentTab
})


const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSetTab: (tab) => {
    dispatch(setTab(tab))
  },
})

const SearchResultState = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SearchResult))

export default SearchResultState
