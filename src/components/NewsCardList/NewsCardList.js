import React from 'react';
import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard';

class NewsCardList extends React.PureComponent {
  render() {
    return (
      <ul className="card-list">
        {}
        { Array.from(this.props.newsList).map((item, key) => (
          <NewsCard
            card={item}
            key={key}
            showBadge={this.props.showBadge}
            buttonType={this.props.buttonType}
            tooltipText={this.props.tooltipText}
            openLoginPopup={this.props.openLoginPopup}
            saveToFavorites={this.props.saveToFavorites}
            deleteCard={this.props.deleteCard}
          />
        )) }
      </ul>
    );
  }
}

export default NewsCardList;
