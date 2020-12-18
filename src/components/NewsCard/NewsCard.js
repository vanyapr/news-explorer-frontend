import React from 'react';
import NewsCardButton from '../NewsCardButton/NewsCardButton';
import cardImage from '../../images/card-image.png';

import './NewsCard.css';

class NewsCard extends React.Component {
  _beautifyDate(ISODate) {
    // Преобразовать дату из формата
    const date = new Date(ISODate);
    const year = date.getFullYear();
    const mounth = date.getMonth();
    const day = date.getDate();

    // Массив с месяцами
    const mounthList = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

    // Собираем строку с датой в шаблон
    return `${day} ${mounthList[mounth]} ${year}`;
  }

  componentDidMount() {
    // При монтировании компонента преобразуем дату
    this._date = this._beautifyDate(this.props.card.publishedAt);
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
        <p className="card__date"><time className="date_range small" dateTime={this.props.card.publishedAt}>{this._date}</time></p>
        < NewsCardButton buttonType={this.props.buttonType} tooltipText={this.props.tooltipText}/>
        { this.props.showBadge && <p className="card__badge">Флюгегехаймер</p> }
      </li>
    );
  }
}

export default NewsCard;
