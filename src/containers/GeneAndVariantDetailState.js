import { connect } from 'react-redux'
import GeneAndVariantDetail from '../components/GeneAndVariantDetail'
import { withRouter } from 'react-router-dom'
import { fetchVariantDetail } from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    variantDetail: state.geneAndVariantDetail.variantDetail
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleGetGeneAndVariantDetail: (entrezId, variantStr, tissue) => {
      dispatch(fetchVariantDetail(entrezId, variantStr, tissue))
    }
  }
};

const GeneAndVariantDetailState = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(GeneAndVariantDetail));

export default GeneAndVariantDetailState
