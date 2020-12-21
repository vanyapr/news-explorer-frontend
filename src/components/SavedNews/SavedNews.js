import React from 'react';
import './SavedNews.css';
import About from '../About/About';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import SavedNewsList from '../SavedNewsList/SavedNewsList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

class SavedNews extends React.PureComponent {
  render() {
    return (
      <>
        <Header isSomePopupOpened={this.props.isSomePopupOpened} closePopup={this.props.closeAllPopups} logout={this.props.logout} openLoginPopUp={this.props.openLoginPopup} />
        <main className='saved'>
          <SavedNewsHeader
            newsList={this.props.newsList}
            articlesWord={this.props.articlesWord}
            keywordsList={this.props.keywordsList}
            keywordsRest={this.props.keywordsRest}
            keywordsRestEnding={this.props.keywordsRestEnding}
          />
          <SavedNewsList newsList={this.props.newsList} deleteCard={this.props.deleteCard}/>
          <About />
        </main>
        <Footer />
      </>
    );
  }
}

export default SavedNews;
