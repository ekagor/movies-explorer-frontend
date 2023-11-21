import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import Register from "../Register/Register";
import SavedMovies from "../SavedMovies/SavedMovies";
import Login from "../Login/Login";
import Main from "../Main/Main";
import api from "../../utils/MainApi";
import Preloader from "../Preloader/Preloader";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { MoviesProvider } from "../../contexts/MoviesContext";
import ProtectedRoutes from "../../utils/ProtectedRoutes";
import { movieCardTemplate } from "../../utils/utils";
import { getMovies } from "../../utils/MoviesApi";
import "./App.css";

const App = () => {
  const path = useLocation().pathname;
  const footerPaths = ["/", "/movies", "/saved-movies"];
  const headerPaths = ["/", "/movies", "/saved-movies", "/profile"];

  const [isStatus, setIsTips] = useState({ status: "", message: "" });
  const [movies, setMovies] = useState(arrMoviesFromStorage());
  const [savedMovies, setSavedFilms] = useState([]);
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isOpenInfoTooltip, setIsOpenTips] = useState(false);
  const [isLoggedInto, setIsLoggedInto] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("jwt"));
  const [currentUser, setCurrentUser] = useState({});

  const navigate = useNavigate();
  const closePopups = () => {
    setIsOpenTips(false);
  };
  const goBack = () => {
    navigate(-1);
  };
  const isMobileOpened = false;

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      return;
    }
    console.log(token)
    api.setAuthoriz(token);
    api
      .getUserInfo()
      .then((data) => {
        setIsLoggedInto(true);
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }, [token]);

  useEffect(() => {
    if (isLoggedInto) {
      Promise.all([api.getUserInfo(), api.getSavedMovies()])
        .then(([user, savedMovies]) => {
          setCurrentUser(user);
          setSavedFilms(savedMovies.reverse());
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isLoggedInto]);

  const plusSavedFilms = (movie) => {
    api
      .plusMovie(movie)
      .then((movie) => {
        setSavedFilms([...savedMovies, movie]);
      })
      .catch(console.error);
  };

  const deleteSavedFilms = (movie) => {
    const movieId =
      movie._id ||
      savedMovies.find((item) => item.movieId === movie.movieId)._id;
    api
      .deleteMovie(movieId)
      .then(() => {
        setSavedFilms((savedingFilms) =>
          savedingFilms.filter((savedMovie) => savedMovie._id !== movieId)
        );
      })
      .catch(console.error);
  };

  const getAllMovies = (viewLoading) => {
    getMovies()
      .then((nextFilms) => {
        console.log(nextFilms)
        const templatedMovies = movieCardTemplate(nextFilms);
        setMovies(templatedMovies);
        localStorage.setItem("movies", JSON.stringify(templatedMovies));
      })
      .catch(console.error)
      .finally(() => {
        viewLoading();
      });
  };

  function arrMoviesFromStorage() {
    return JSON.parse(localStorage.getItem("movies") ?? "[]");
  }

  function checkSavedMovies(movie) {
    return savedMovies.some(
      (item) => item._id === movie._id || item.movieId === movie.movieId
    );
  }

  const logOut = () => {
    localStorage.clear();

    setIsLoggedInto(false);
    setToken("");
    setMovies([]);
    setSavedFilms([]);
    setCurrentUser({});
    navigate("/");
  };

  const updating = (name, email) => {
    return api
      .updatingData(name, email)
      .then((updatUserInfo) => {
        setCurrentUser(updatUserInfo);
        setIsOpenTips(true);
        setIsTips({ status: true, message: "Данные обновлены." });
      })
      .catch((err) => {
        setIsOpenTips(true);
        setIsTips({ status: false, message: "Что-то пошло не так!" });
      });
  };

  const registering = async (userData) => {
    try {
      await api.registering(userData);
      logining({ email: userData.email, password: userData.password });
    } catch (err) {
      setIsOpenTips(true);
      setIsTips({ status: false, message: "Что-то пошло не так!" });
      console.log(err);
    }
  };

  const logining = async (infoLogin) => {
    try {
      const res = await api.logining(infoLogin);
      setToken(res.token);
      setIsLoggedInto(true);
      api.setAuthoriz(res.token);
      localStorage.setItem("jwt", res.token);
      navigate("/movies");
    } catch (err) {
      setIsOpenTips(true);
      setIsTips({ status: false, message: "Что-то пошло не так!" });
      console.log(err);
      setLoginError("Что-то пошло не так!");
      logOut();
    }
  };

  if (isLoading) {
    return <Preloader />;
  } else {
    return (
      <CurrentUserContext.Provider value={currentUser}>
        <MoviesProvider>
          <div className="app">
            {headerPaths.includes(path) && (
              <Header
                isLoggedInto={isLoggedInto}
                isMobileOpened={isMobileOpened}
              />
            )}
            <Routes>
              <Route element={<ProtectedRoutes isLoggedInto={!isLoggedInto} />}>
                <Route
                  path="/signin"
                  element={
                    <Login
                      isLoggedInto={isLoggedInto}
                      logining={logining}
                      errorMessage={loginError}
                      title="Вход"
                      buttonText="Войти"
                    />
                  }
                ></Route>
                <Route
                  path="/signup"
                  element={
                    <Register
                      isLoggedInto={isLoggedInto}
                      registering={registering}
                      title={"Регистрация"}
                      buttonText={"Зарегистрироваться"}
                    />
                  }
                ></Route>
              </Route>
              <Route path="/" element={<Main />}></Route>

              <Route element={<ProtectedRoutes isLoggedInto={isLoggedInto} />}>
                <Route
                  path="/movies"
                  element={
                    <Movies
                      getMovies={getAllMovies}
                      movies={movies}
                      addMovie={plusSavedFilms}
                      onDeleteFilm={deleteSavedFilms}
                      checkSavedMovies={checkSavedMovies}
                      setIsLoading={setIsLoading}
                    />
                  }
                ></Route>
                <Route
                  path="/saved-movies"
                  element={
                    <SavedMovies
                      movies={savedMovies}
                      onDeleteFilm={deleteSavedFilms}
                      checkSavedMovies={checkSavedMovies}
                    />
                  }
                ></Route>

                <Route
                  path="/profile"
                  element={<Profile loginingOut={logOut} updating={updating} />}
                ></Route>
                <Route path="*" element={<NotFound onBack={goBack} />} />
              </Route>
            </Routes>
            {footerPaths.includes(path) && <Footer />}
            <InfoTooltip
              isRegister={isStatus}
              isOpen={isOpenInfoTooltip}
              onClose={closePopups}
              alt={"Статус"}
            />
          </div>
        </MoviesProvider>
      </CurrentUserContext.Provider>
    );
  }
};

export default App;
