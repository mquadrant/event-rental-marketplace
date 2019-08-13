class Auth {
  constructor() {
    if (localStorage.getItem("token")) {
      this.authenticated = true;
    } else {
      this.authenticated = false;
    }
  }
  login(callback) {
    this.authenticated = true;
    callback();
  }
  logout(callback) {
    this.authenticated = false;
    callback();
  }
  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
