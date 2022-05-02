'use strict';

import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSabmit) {
    super(popupSelector);
    this._handleSabmit = handleSabmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = [...this._form.querySelectorAll('.popup__input-form')];
  };

  close() {
    super.close();
    this._form.reset();
  };

  _getInputValues() {
    const values = {};
    this._inputs.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  };

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', () => {
      this._handleSabmit(this._getInputValues());
    });
  };
};