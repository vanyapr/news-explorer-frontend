import React from 'react';
import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard';

class NewsCardList extends React.Component {
  render() {
    return (
      <div className="card-list">
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
      </div>
    );
  }
}

export default NewsCardList;
