import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

class Header extends React.Component {
  render() {
    return (
      <header className={`header ${this.props.theme ? `header_${this.props.theme}` : ''}`}>
        <div className="header__container">
          <Link to="/" className={`header__logo ${this.props.theme && `header__logo_${this.props.theme}`}`} title='News Explorer'>NewsExplorer</Link>
          <Navigation openLoginPopUp={this.props.openLoginPopUp} theme={this.props.theme} />
        </div>
      </header>
    );
  }
}

export default Header;
