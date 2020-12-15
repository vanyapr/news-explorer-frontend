import React from 'react';
import { Link } from 'react-router-dom'; // Компоненты для роутинга и редиректа
import NewsCardButton from '../NewsCardButton/NewsCardButton';
import cardImage from '../../images/card-image.png';

import './NewsCard.css';

class NewsCard extends React.Component {
  render() {
    return (
      <section className="card">
        <div className="card__image-container">
          <img src={cardImage} alt="Название карточки" className="card__image"/>
        </div>
        <div className="card__text">
          <h3 className="card__name">
            <Link to='href://somewhere.ru' className='card__link'>«Три строки тайга»: новый фотопроект Игоря Шпиленка</Link>
          </h3>
          <p className="card__description">В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе.</p>
        </div>
        <p className="card__source">Лента.ру</p>
        <p className="card__date"><time className="date_range small" dateTime="2019-2-08 00:00">2 августа, 2019</time></p>
        < NewsCardButton buttonType={this.props.buttonType} tooltipText={this.props.tooltipText}/>
        { this.props.showBadge && <p className="card__badge">Флюгегехаймер</p> }
      </section>
    );
  }
}

export default NewsCard;
