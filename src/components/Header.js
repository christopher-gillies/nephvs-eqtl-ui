import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Link
} from 'react-router-dom'
import SearchFormState from '../containers/SearchFormState'
import './Header.css'
import logo from '../eQTLBrowser_Logo_MaizeAndBlue.png'

class Header extends Component {
  render() {
    let busy = null;
    if(this.props.isFetching === true) {
      busy = (
        <li>
          <i className="fa fa-spinner fa-spin fa-2x fa-fw"></i>
        </li>
      );
    }
    let search = null;
    //don't display searchbox if on the first page
    if(this.props.pathname !== "/") {
      search = (
        <li>
          <SearchFormState header={true} stateKey="header" options={this.props.options} />
        </li>
    );
    }

    return (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="collapse navbar-collapse">
    <Link className="navbar-brand" to="/"><img className="header_logo" alt="logo" src={logo}></img>{this.props.title}</Link>
    <ul className="navbar-nav ml-auto">
      {busy}
      {search}
      <li className="nav-item"><a className="nav-link" href="http://nephvs.org" target="_blank" rel="noopener noreferrer">NephVS</a></li>
      <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
    </ul>
  </div>
</nav>

    )
  }
}

Header.propTypes = {
  title: PropTypes.string
};

export default Header;
