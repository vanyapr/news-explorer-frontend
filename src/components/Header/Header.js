import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isNavigationOpened: false,
    };
  }

  toggleNavigation = () => {
    this.setState({
      isNavigationOpened: !this.state.isNavigationOpened,
    });
  }

  render() {
    return (
      <header className={`header ${this.props.theme ? `header_${this.props.theme}` : ''} ${this.state.isNavigationOpened ? 'header_state_navigation-opened' : ''}`}>
        <div className="header__container">
          <Link to="/" className={`header__logo ${this.props.theme && `header__logo_${this.props.theme}`}`} title='News Explorer'>NewsExplorer</Link>
          <Navigation isOpened={this.state.isNavigationOpened} openLoginPopUp={this.props.openLoginPopUp} theme={this.props.theme} />
          <button onClick={this.toggleNavigation} className={`header__switch ${this.state.isNavigationOpened ? 'header__switch_state_enabled' : ''} ${this.props.theme ? `header__switch_${this.props.theme}` : ''}`}>Показать навигацию</button>
        </div>
      </header>
    );
  }
}

export default Header;
