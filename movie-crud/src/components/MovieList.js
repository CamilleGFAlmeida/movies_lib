import React from 'react';
import MovieItem from './MovieItem';

const MovieList = ({ movies, setEditingMovie, deleteMovie }) => {
  return (
    <ul>
      {movies.map((movie) => (
        <MovieItem
          key={movie.id}
          movie={movie}
          setEditingMovie={setEditingMovie}
          deleteMovie={deleteMovie}
        />
      ))}
    </ul>
  );
};

export default MovieList;
