import React from 'react';
import './PopupWithForm.css';

class PopupWithForm extends React.Component {
  handleLinkClick = (event) => {
    event.preventDefault();
    this.props.changePopup();
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(event.target);
  }

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit} className="form" noValidate>
          {this.props.children}
          {this.props.formError && <div className="form__form-error">{this.props.formError}</div>}
          <button type="submit" className={this.props.buttonEnabled ? 'form__submit-button' : 'form__submit-button  form__submit-button_state_disabled'} disabled={!this.props.buttonEnabled}>{this.props.buttonText}</button>
        </form>
        <p className="form__variants">или <a onClick={this.handleLinkClick} className='form__link'>{this.props.alternative}</a></p>
      </>
    );
  }
}

export default PopupWithForm;
