import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

class Header extends React.Component {
  // constructor(props) {
  //   super(props);
  //
  //   this.state = {
  //     theme: this.props.theme,
  //   };
  // }

  render() {
    return (
      <header className={`header ${this.props.theme ? `header_${this.props.theme}` : ''}`}>
        <div className="header__container">
          <Link to="/" className={`header__logo ${this.props.theme && `header__logo_${this.props.theme}`}`} title='News Explorer'>NewsExplorer</Link>
          <Navigation theme={this.props.theme} />
        </div>
      </header>
    );
  }
}

export default Header;
