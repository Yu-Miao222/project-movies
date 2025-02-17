import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MOVIE_LIST_URL } from 'utils/urls';

export const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(MOVIE_LIST_URL)
      .then((response) => response.json())
      .then((data) => setMovieList(data.results))
      .catch((error) => alert(error, 'error'))
      .finally(() => setLoading(false));
  }, [])

  if (loading) {
    return (
      <div className="loading-container">
        <h2>Loading..</h2>
      </div>
    );
  }

  return (
    <section className="movieListWrapper">
      <h1 className="popular-movie">Popular right now</h1>
      <div className="popular-movie-container">
        {movieList.map((singleMovie) => {
          return (
            <div className="movie-wrapper">
              <Link key={singleMovie.id} to={`/moviedetails/${singleMovie.id}`}>
                <img className="posterImg" src={`https://image.tmdb.org/t/p/w300${singleMovie.poster_path}`} alt={singleMovie.title} />
                <div className="hoverBox">
                  <h1 className="hoverTitle">{singleMovie.original_title}</h1>
                  <p className="hoverDate">Release date: {singleMovie.release_date}</p>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </section>
  )
}
