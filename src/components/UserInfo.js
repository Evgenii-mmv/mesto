export default class UserInfo {
  constructor({ selectorName, selectorSelfInfo }) {
    this._name = document.querySelector(selectorName);
    this._selfInfo = document.querySelector(selectorSelfInfo);
  }
  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      info: this._selfInfo.textContent
    };
    return userInfo;
  }
  setUserInfo({ name, info }) {
    this._name.textContent = name;
    this._selfInfo.textContent = info;
  }
} 