import decode from "jwt-decode";

const TOKEN_KEY = "@tpw-artigos";

const AuthService = {
  setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
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
    return localStorage.getItem(TOKEN_KEY);
  },

  logout(props) {
    localStorage.removeItem(TOKEN_KEY);
    props.history.push("/");
  },

  getProfile() {
    return decode(this.getToken());
  },
};

export default AuthService;