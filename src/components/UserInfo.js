'use strict';

export class UserInfo {
  constructor({ profileNameSelector, profileOccupationtSelector, profileAvatarSelector}) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileOccupation = document.querySelector(profileOccupationtSelector);
    this._profileAvatar = document.querySelector(profileAvatarSelector);
  };

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      about: this._profileOccupation.textContent
    };
  };

  setUserInfo(title, subtitle, avatar) {
    this._profileName.textContent = title;
    this._profileOccupation.textContent = subtitle;
    this._profileAvatar.src = avatar;
  };
};