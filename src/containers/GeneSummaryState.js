import { connect } from 'react-redux'
import { setTabGeneSummary } from '../actions'
import GeneSummary from '../components/GeneSummary'
import { withRouter } from 'react-router-dom'
import QueryService from '../services/QueryService'

const mapStateToProps = (state, ownProps) => {
  //console.log("SearchResult map state to props")
  return {
    currentTab: state.geneSummary.currentTab,
    glomResults: state.geneSummary.glomResults,
    tubResults: state.geneSummary.tubResults,
  }
}


const queryService = new QueryService()

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSetTab: (tab) => {
    dispatch(setTabGeneSummary(tab))
  },
});

const GeneSummaryState = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(GeneSummary));

export default GeneSummaryState;
