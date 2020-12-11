import React from 'react';
import './SearchResult.css';
import NewsCardList from '../NewsCardList/NewsCardList';
import Preloader from '../Preloader/Preloader';

class SearchResult extends React.Component {
  render() {
    return (
      <section className='search-result'>
        <h2 className="search-result__heading">Результаты поиска</h2>
        <div className="search-result__cards">
          <NewsCardList />
          <Preloader />
        </div>
        <div className="search-result__button-container">
          <button className="search-result__button">Показать еще</button>
        </div>
      </section>
    );
  }
}

export default SearchResult;