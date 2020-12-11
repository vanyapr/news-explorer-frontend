import React from 'react';
import { Link } from 'react-router-dom'; // Компоненты для роутинга и редиректа

import './NewsCard.css';

class NewsCard extends React.Component {
  render() {
    return (
      <section className="card">
        <img src="https://placehold.it/400x272" alt="Название карточки" className="card__image"/>
        <div className="card__text">
          <h3 className="card__name">
            <Link to='href://somewhere.ru' className='card__link'>«Три строки тайга»: новый фотопроект Игоря Шпиленка</Link>
          </h3>
          <p className="card__description">В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе.</p>
        </div>
        <p className="card__source">Лента.ру</p>
        <p className="card__date"><time className="date_range small" dateTime="2019-2-08 00:00">2 августа, 2019</time></p>
        <button className="card__favorites">Добавить в избранное</button>
      </section>
    );
  }
}

export default NewsCard;
