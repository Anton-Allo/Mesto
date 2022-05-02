'use strict';

import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupTitleImage = this._popup.querySelector('.popup__title-image');
    this._popupViewImage = this._popup.querySelector('.popup__view-image');
  };

  open(nameImage, linkImage) {
    this._popupViewImage.src = linkImage;
    this._popupViewImage.alt = nameImage;
    this._popupTitleImage.textContent = nameImage;
    super.open();
  };
};