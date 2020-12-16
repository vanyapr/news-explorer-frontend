import React from 'react';
import './PopupWithForm.css';

class PopupWithForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSubmitButtonDisabled: false,
    };

    this.formError = 'Такой пользователь уже есть';
  }

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
        <form onSubmit={this.handleSubmit} className="form">
          {this.props.children}
          {this.formError && <div className="form__form-error">{this.formError}</div>}
          <button type="submit" className={this.state.isSubmitButtonDisabled ? 'form__submit-button form__submit-button_state_disabled' : 'form__submit-button'} disabled={this.state.isSubmitButtonDisabled}>{this.props.buttonText}</button>
        </form>
        <p className="form__variants">или <a onClick={this.handleLinkClick} className='form__link'>{this.props.alternative}</a></p>
      </>
    );
  }
}

export default PopupWithForm;
