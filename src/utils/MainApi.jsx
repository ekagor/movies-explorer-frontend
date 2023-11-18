class MainApi {
  constructor({ apiUrl, requestHeaders }) {
    this.apiUrl = apiUrl;
    this.requestHeaders = requestHeaders;
    this.authHeaders = null;
  }

  deleteAuthHeaders = () => (this.authHeaders = null);

  setAuthoriz = (token) => {
    this.authHeaders = {
      ...this.requestHeaders,
      authorization: `Bearer ${token}`,
    };
  };

  handleReply = (response) =>
    response.ok ? response.json() : Promise.reject(`Error: ${response.status}`);

  makeRequest = (method, path, body, notSave) => {
    const requestOptions = {
      method: method,
      headers: notSave ? this.requestHeaders : this.authHeaders,
    };
    if (body) requestOptions.body = JSON.stringify(body);

    return fetch(`${this.apiUrl}${path}`, requestOptions).then(this.handleReply);
  };

  registering = (regData) =>
    this.makeRequest('POST', '/signup', regData, 'notSave');

  logining = (infoLogin) =>
    this.makeRequest('POST', '/signin', infoLogin, 'notSave');

  updatingData = (userData) =>
    this.makeRequest('PATCH', '/users/me', userData);

  getUserInfo = () => this.makeRequest('GET', '/users/me');

  getSavedMovies = () => this.makeRequest('GET', '/movies');

  plusMovie = (movie) => this.makeRequest('POST', '/movies/', movie);

  deleteMovie = (id) => this.makeRequest('DELETE', `/movies/${id}`);
}

const api = new MainApi({
  apiUrl: 'https://api.katydiplom.nomoredomainsrocks.ru',
  requestHeaders: {
    'Content-Type': 'application/json',
  },
});

export default api;