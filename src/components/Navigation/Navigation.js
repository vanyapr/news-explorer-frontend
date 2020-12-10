import React from 'react';
import './Navigation.css';
import { NavLink, Switch, Route } from 'react-router-dom';

class Navigation extends React.Component {
  render() {
    return (
      <nav className='navigation'>
        <NavLink exact to='/' className={`navigation__link ${this.props.theme ? `navigation__link_${this.props.theme}` : ''}`}>Главная</NavLink>
        <NavLink to='/saved-news' className={`navigation__link ${this.props.theme ? `navigation__link_${this.props.theme}` : ''}`}>Сохранённые статьи</NavLink>
        <button className={`navigation__button ${this.props.theme ? `navigation__button_${this.props.theme}` : ''}`}>
          Юзернейм
          <i className="navigation__button-icon-logout">Выйти</i>
        </button>
      </nav>
    );
  }
}

export default Navigation;
