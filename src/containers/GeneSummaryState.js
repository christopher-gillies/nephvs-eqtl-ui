import { connect } from 'react-redux'
import { setTabGeneSummary, fetchGeneSummary, setFiltersGeneSummary } from '../actions'
import GeneSummary from '../components/GeneSummary'
import { withRouter } from 'react-router-dom'


const mapStateToProps = (state, ownProps) => {
  //console.log("SearchResult map state to props")
  return {
    currentTab: state.geneSummary.currentTab,
    fdr: state.geneSummary.fdr,
    glomSummaries: state.geneSummary.glomSummaries,
    tubSummaries: state.geneSummary.tubSummaries,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSetTab: (tab) => {
    dispatch(setTabGeneSummary(tab))
  },

  handleGetSummary: (fdr) => {
      dispatch(fetchGeneSummary(fdr))
  },

  handleFDRChange: (fdr) => {
    dispatch(setFiltersGeneSummary({ fdr: fdr }))
  }

});

const GeneSummaryState = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(GeneSummary));

export default GeneSummaryState;
