import React from 'react';
import NewsCardList from '../NewsCardList/NewsCardList';
import './SavedNewsList.css';

class SavedNewsList extends React.PureComponent {
  render() {
    return (
      <section className='saved-list' aria-label='Сохранённые новости'>
        <NewsCardList
          newsList={this.props.newsList}
          showBadge={true}
          buttonType='delete'
          tooltipText='Убрать из сохранённых'
          deleteCard={this.props.deleteCard}
        />
      </section>
    );
  }
}

export default SavedNewsList;
