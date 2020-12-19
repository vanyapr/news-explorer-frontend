import React from 'react';
import './Navigation.css';
import { NavLink } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/currentUserContext'; // Контекст текущего юзера

class Navigation extends React.PureComponent {
  static contextType = CurrentUserContext;
  // Поскольку контекст в классовом компоненте может быть только 1,
  // буду использовать значение this.context как булево

  render() {
    return (
      <nav className={`navigation ${this.props.theme ? `navigation_theme_${this.props.theme}` : ''} ${this.props.isOpened ? 'navigation_state_opened' : ''}`}>
        <ul className={`navigation__list ${this.props.theme ? `navigation__list_${this.props.theme}` : ''}`}>
          <li className="navigation__list-item">
            <NavLink exact to='/' className={`navigation__link ${this.props.theme ? `navigation__link_${this.props.theme}` : ''}`}>Главная</NavLink>
          </li>

          {this.context && <li className="navigation__list-item">
            <NavLink to='/saved-news' className={`navigation__link ${this.props.theme ? `navigation__link_${this.props.theme}` : ''}`}>Сохранённые статьи</NavLink>
          </li>}
          <li className="navigation__list-item">
            {this.context && <button onClick={this.props.logout} className={`navigation__button ${this.props.theme ? `navigation__button_${this.props.theme}` : ''}`}>
              {this.context.name}
              <i className={`navigation__button-icon-logout ${this.props.theme ? `navigation__button-icon-logout_${this.props.theme}` : ''}`}>Выйти</i>
            </button>
            }
            {!this.context && <button onClick={this.props.openLoginPopUp} className={`navigation__button ${this.props.theme ? `navigation__button_${this.props.theme}` : ''}`}>
              Авторизоваться
            </button>
            }
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navigation;
