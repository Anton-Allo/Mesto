'use strict';

export class UserInfo {
  constructor({ profileNameSelector, profileOccupationtSelector }) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileOccupation = document.querySelector(profileOccupationtSelector);

  };

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      occupation: this._profileOccupation.textContent
    };
  };

  setUserInfo(title, subtitle) {
    this._profileName.textContent = title;
    this._profileOccupation.textContent = subtitle;
  };
};