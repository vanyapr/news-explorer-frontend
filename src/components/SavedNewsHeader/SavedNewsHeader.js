import React from 'react';
import './SavedNewsHeader.css';
import { CurrentUserContext } from '../../contexts/currentUserContext'; // Контекст текущего юзера

class SavedNewsHeader extends React.Component {
  static contextType = CurrentUserContext;

  render() {
    return (
      <section className="saved-header">
        <div className="saved-header__container">
          <h1 className="saved-header__title">Сохранённые статьи</h1>
          <p className="saved-header__subtitle">{this.context.name}, у вас 5 сохранённых статей</p>
          <p className="saved-header__description">По ключевым словам: <strong className="saved-header__strong">Природа</strong>, <strong className="saved-header__strong">Эчпочмак</strong> и <strong className="saved-header__strong">2-м другим</strong></p>
        </div>
      </section>
    );
  }
}

export default SavedNewsHeader;
