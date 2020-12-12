import React from 'react';
import './SavedNewsHeader.css';

class SavedNewsHeader extends React.Component {
  render() {
    return (
      <section className="saved-header">
        <div className="saved-header__container">
          <h1 className="saved-header__title">Сохранённые статьи</h1>
          <p className="saved-header__subtitle">Грета, у вас 5 сохранённых статей</p>
          <p className="saved-header__description">По ключевым словам: <strong className="saved-header__strong">Природа</strong>, <strong className="saved-header__strong">Эчпочмак</strong> и <strong className="saved-header__strong">2-м другим</strong></p>
        </div>
      </section>
    );
  }
}

export default SavedNewsHeader;
