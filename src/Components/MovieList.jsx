const MovieList = (props) => {

    const FavouriteComponent = props.favoriteComponent
  return (
    <>
      {props.movies.map((movie, index) => (
        // <div className="col " key={index}>
        <div className="col image-container d-flex justify-content-start m-3" key={index}>
          <img src={movie.Poster} alt="Movie" className="image-container"/>
          <div className="overlay d-flex align-items-center justify-content-center" onClick={()=>props.handleFavouriteClick(movie)}>
            <FavouriteComponent/>
          </div>
        </div>
      ))}
    </>
  );
};

export default MovieList;
