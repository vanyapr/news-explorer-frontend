import React from 'react';
import './SavedNews.css';
import About from '../About/About';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import SavedNewsList from '../SavedNewsList/SavedNewsList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

class SavedNews extends React.Component {
  render() {
    return (
      <>
        <Header isSomePopupOpened={this.props.isSomePopupOpened} closePopup={this.props.closeAllPopups} logout={this.props.logout} openLoginPopUp={this.props.openLoginPopup} />
        <main className='saved'>
          <SavedNewsHeader />
          <SavedNewsList />
          <About />
        </main>
        <Footer />
      </>
    );
  }
}

export default SavedNews;
