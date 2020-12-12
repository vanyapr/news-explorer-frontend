import React from 'react';
import './SavedNews.css';
import About from '../About/About';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import SavedNewsList from '../SavedNewsList/SavedNewsList';

class SavedNews extends React.Component {

  render() {
    return (
      <>
        <main className='saved'>
          <SavedNewsHeader />
          <SavedNewsList />
          <About />
        </main>
      </>
    );
  }
}

export default SavedNews;
