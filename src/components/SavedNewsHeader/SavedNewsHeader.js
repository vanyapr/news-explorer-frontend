import React from 'react';
import './SavedNewsHeader.css';
import { CurrentUserContext } from '../../contexts/currentUserContext'; // Контекст текущего юзера

class SavedNewsHeader extends React.PureComponent {
  static contextType = CurrentUserContext;

  _countRestKeywords() {
    // Окончание числа ключивых слов
    return this.props.newsList.length - 2;
  }

  render() {
    return (
      <section className="saved-header">
        <div className="saved-header__container">
          <h1 className="saved-header__title">Сохранённые статьи</h1>
          <p className="saved-header__subtitle">{this.context.name}, у вас {this.props.newsList.length} {this.props.articlesWord}</p>
          {this.props.keywordsList
          && <p className="saved-header__description">По ключевым словам: <strong className="saved-header__strong">{this.props.keywordsList}</strong> {this.props.keywordsRest ? 'и' : ''} <strong className="saved-header__strong">{this.props.keywordsRest ? `${this.props.keywordsRestEnding}` : ''}</strong></p>}
        </div>
      </section>
    );
  }
}

export default SavedNewsHeader;
