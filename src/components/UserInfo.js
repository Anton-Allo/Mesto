'use strict';

export class UserInfo {
  constructor({ profileNameSelector, profileOccupationSelector, profileAvatarSelector}) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileOccupation = document.querySelector(profileOccupationSelector);
    this._profileAvatar = document.querySelector(profileAvatarSelector);
  };

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      about: this._profileOccupation.textContent
    };
  };

  setUserInfo(title, about, avatar) {
    this._profileName.textContent = title;
    this._profileOccupation.textContent = about;
    this._profileAvatar.src = avatar;
  };
};