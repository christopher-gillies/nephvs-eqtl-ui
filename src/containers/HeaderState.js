import { connect } from 'react-redux'
import Header from '../components/Header'
import { withRouter } from 'react-router-dom'

const mapStateToProps = (state, ownProps) => {
  return {
    isFetching: state.gene.isFetching,
    pathname: ownProps.location.pathname,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  
})

const HeaderState = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Header));

export default HeaderState
