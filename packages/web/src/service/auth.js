import decode from 'jwt-decode';

const TOKEN_KEY = '@tpw-artigos';

const AuthService = {
  setToken(dados) {
    localStorage.setItem(TOKEN_KEY, dados);
  },

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  },

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  },

  getToken() {
    let token;
    if (localStorage.getItem(TOKEN_KEY)) {
      token = JSON.parse(localStorage.getItem(TOKEN_KEY)).token;
    }

    return token;
  },

  logout(props) {
    localStorage.removeItem(TOKEN_KEY);
    props.history.go();
  },

  getProfile() {
    return decode(this.getToken());
  },

  getName() {
    let name;
    if (localStorage.getItem(TOKEN_KEY)) {
      name = JSON.parse(localStorage.getItem(TOKEN_KEY)).name;
    }
    return name;
  },
};

export default AuthService;
