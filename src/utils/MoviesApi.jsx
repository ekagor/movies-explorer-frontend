const MOVIES_URL = 'https://api.nomoreparties.co';

const getMovies = () =>
  fetch(`${MOVIES_URL}/beatfilm-movies`, { method: 'GET' }).then((res) => {
    return (res.ok) ? Promise.resolve(res.json()) : Promise.reject(res.status);
  });
export { getMovies, MOVIES_URL, };