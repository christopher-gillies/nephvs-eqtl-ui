import { connect } from 'react-redux'
import { setTab, fetchQueryResults, setFilters } from '../actions'
import SearchResult from '../components/SearchResult'
import { withRouter } from 'react-router-dom'
import QueryService from '../services/QueryService'

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


const queryService = new QueryService()

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSetTab: (tab) => {
    dispatch(setTab(tab))
  },

  submitQuery: (query, maxPVal) => {

    //before submitting validate query
    queryService.validateQuery(query, (jsonRes) => {
      if(jsonRes.status === "Valid") {

        if(jsonRes.type === "Variant" || jsonRes.type === "dbSNP" ||
          jsonRes.type === "Region" ) {
          //force maxpval to be 1
          dispatch(setFilters({
            visible: false,
            maxPVal: 1
          }));
          maxPVal = 1;
        }
        dispatch(fetchQueryResults(query, maxPVal))
      } else {
        // TODO: Do something with this issue
        console.log("Query is not valid")
      }
    }, (error) => {
      console.log("Error no connection to server")
    });


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
