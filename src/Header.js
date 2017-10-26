import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Link
} from 'react-router-dom'
import SearchForm from './SearchForm'

class Header extends Component {
  render() {

    let search = null;
    if(this.props.showSearch === true) {
      search = (
        <ul className="nav navbar-nav">
        <li>
          <SearchForm header={true} options={this.props.options} />
        </li>
      </ul>
    );
    }

    return (
  <nav className="navbar navbar-default">
  <div className="container-fluid">
    <div className="navbar-header">
      <Link className="navbar-brand" to="/">{this.props.title}</Link>
    </div>
    {search}
    <ul className="nav navbar-nav navbar-right">
      <li><a href="http://nephvs.org">NephVS</a></li>
      <li><Link to="/about">About</Link></li>
    </ul>
  </div>
</nav>

    )
  }
}

Header.propTypes = {
  name: PropTypes.string,
  showSearch: PropTypes.bool
};

export default Header;
