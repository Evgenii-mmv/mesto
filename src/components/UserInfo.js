export default class UserInfo {
  constructor({ selectorName, selectorSelfInfo, selectorAvatar }) {
    this._name = document.querySelector(selectorName);
    this._selfInfo = document.querySelector(selectorSelfInfo);
    this._avatar = document.querySelector(selectorAvatar);
  }

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      info: this._selfInfo.textContent,
      avatar: this._avatar.src
    };
    return userInfo;
  }

  setUserInfo({ name, info }) {
    this._name.textContent = name;
    this._selfInfo.textContent = info;
  }

  setNewAvatar(avatar) {
    this._avatar.src = avatar;
  }
}