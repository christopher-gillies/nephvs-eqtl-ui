import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Link
} from 'react-router-dom'
import SearchFormState from '../containers/SearchFormState'
import './Header.css'

class Header extends Component {
  render() {

    let search = null;
    if(this.props.showSearch === true) {
      search = (
        <li>
          <SearchFormState header={true} options={this.props.options} />
        </li>
    );
    }

    return (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="collapse navbar-collapse">
    <Link className="navbar-brand" to="/">{this.props.title}</Link>
    <ul className="navbar-nav ml-auto">
      {search}
      <li className="nav-item"><a className="nav-link" href="http://nephvs.org">NephVS</a></li>
      <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
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
