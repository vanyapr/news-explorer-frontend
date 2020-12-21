import React from 'react';
import './SearchResult.css';
import NewsCardList from '../NewsCardList/NewsCardList';
import Preloader from '../Preloader/Preloader';
import NotFound from '../NotFound/NotFound';

class SearchResult extends React.PureComponent {
  render() {
    return (
      <section className='search-result'>
        <h2 className="search-result__heading">Результаты поиска</h2>
        <div className="search-result__cards">
          <NewsCardList
            openLoginPopup={this.props.openLoginPopup}
            saveToFavorites={this.props.saveToFavorites}
            newsList={this.props.newsList}
            buttonType='bookmark'
            tooltipText='Войдите чтобы сохранять статьи'
          />
          {this.props.isLoadSpinnerVisible && <Preloader />}
          {this.props.isSearchErrorVisible && <NotFound searchErrorHeading={this.props.searchErrorHeading} searchErrorText={this.props.searchErrorText}/>}
        </div>
        {this.props.isShowMoreButtonVisible && <div className="search-result__button-container">
          <button onClick={this.props.showMoreNews} className={this.props.isShowMoreButtonActive ? 'search-result__button' : 'search-result__button search-result__button_state_disabled'} disabled={!this.props.isShowMoreButtonActive}>Показать еще</button>
        </div>}
      </section>
    );
  }
}

export default SearchResult;
