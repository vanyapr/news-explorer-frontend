import React from 'react';
import NewsCardList from '../NewsCardList/NewsCardList';
import './SavedNewsList.css';

class SavedNewsList extends React.Component {
  render() {
    return (
      <section className='saved-list'>
        <NewsCardList showBadge={true} buttonType='delete' tooltipText='Убрать из сохранённых'/>
      </section>
    );
  }
}

export default SavedNewsList;
