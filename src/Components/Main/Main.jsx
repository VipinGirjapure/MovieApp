import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Main.css";
import MovieList from "../MovieList";
// import axios from "axios";
import MovieListHeading from "../MovieListHeading";
import SearchBox from "../SearchBox";
import AddFavorite from "../AddFavorite";
import RemoveFavourites from "../RemoveFavourites";


const Main = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [favourites, setFavourites] = useState([]);
  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=d1405a67`;
    const response = await fetch(url);
    const responseJson = await response.json();
    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
    // else{
    //     setMovies(responseJson)
    // }

    // await axios(url).then((res) => {
    //   console.log(res.data.Search);
    //   if (res.data.Search) {
    //       setMovies(res.data.Search);
    //     }
    // });
  };
  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem("react-movie-app-favourites")
    );
    if (movieFavourites) {
      setFavourites(movieFavourites);
    }
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favourites", JSON.stringify(items));
  };
  const addFavoriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };
  const removeFavoriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };
  return (
    <div className="container-fluid movie-main">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="MovieFlix" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="row">
        <MovieList
          movies={movies}
          handleFavouriteClick={addFavoriteMovie}
          favoriteComponent={AddFavorite}
        />
      </div>
    <hr />
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Favourites" /> 
      </div>
      <div className="row">
        <MovieList
          movies={favourites}
          handleFavouriteClick={removeFavoriteMovie}
          favoriteComponent={RemoveFavourites}
        />
      </div>
    </div>
  );
};

export default Main;
