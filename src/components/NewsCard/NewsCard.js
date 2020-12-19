import React from 'react';
import NewsCardButton from '../NewsCardButton/NewsCardButton';
import cardImage from '../../images/card-image.png';
import Utils from '../../utils/utils';

import './NewsCard.css';

class NewsCard extends React.Component {
  constructor(props) {
    super(props);
    // Объявили внешнюю функцию обработки даты
    this._convertDate = Utils.beautifyDate;
    // Сконвертировали дату в красивый формат
    this._beautyDate = this._convertDate(this.props.card.publishedAt);
  }

  render() {
    return (
      <li className="card">
        <div className="card__image-container">
          <img src={this.props.card.urlToImage ? this.props.card.urlToImage : cardImage} alt={this.props.card.title} className="card__image"/>
        </div>
        <div className="card__text">
          <h3 className="card__name">
            <a href={this.props.card.url} className='card__link' rel='noreferrer' target='_blank'>
              {this.props.card.title}
            </a>
          </h3>
          <p className="card__description">
            {this.props.card.description}
          </p>
        </div>
        <p className="card__source">{this.props.card.source.name}</p>
        <p className="card__date"><time className="date_range small" dateTime={this.props.card.publishedAt}>{this._beautyDate}</time></p>
        <NewsCardButton card={this.props.card} saveToFavorites={this.props.saveToFavorites} openLoginPopup={this.props.openLoginPopup} buttonType={this.props.buttonType} tooltipText={this.props.tooltipText}/>
        { this.props.card.keyword && <p className="card__badge">{this.props.card.keyword}</p> }
      </li>
    );
  }
}

export default NewsCard;
