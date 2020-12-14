import React from 'react';
import './Popup.css';

class Popup extends React.Component {
  handleClose = (event) => {
    console.log(event.target.className);
    if (event.target.classList.contains('popup_opened') || event.target.className === 'popup__close') {
      this.props.close();
    }
  }

  render() {
    return (
      <div onClick={this.handleClose} className={this.props.isOpened ? 'popup popup_opened' : 'popup'}>
        <div className="popup__container">
          <button className="popup__close" onClick={this.handleClose}>Закрыть</button>
          <h2 className="popup__title">{this.props.title}</h2>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Popup;
