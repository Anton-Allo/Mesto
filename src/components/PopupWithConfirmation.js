'use strict';

import { Popup } from './Popup.js';

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, titleButton, handleSubmit) {
    super(popupSelector);
    this._textDefault = this._buttonSubmit.textContent;
    this._handleSubmit = handleSubmit;
    this._titleButton = titleButton;
  }

  open() {
    super.open();
    if (this._buttonSubmit.disabled) {
      this._buttonSubmit.removeAttribute('disabled');
    }
  }

  changeSubmitHandler(newHandlerSubmit) {
    this._handleSubmit = newHandlerSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._buttonSubmit.addEventListener('click', () => {
      this.renderLoading(true);
      this._handleSubmit();
    })
  }

  renderLoading(isLoad) {
    if (isLoad) {
      this._buttonSubmit.textContent = this._titleButton;
      this._buttonSubmit.setAttribute('disabled', 'true');
    } else {
      this._buttonSubmit.textContent = this._textDefault;
    }
  }
}