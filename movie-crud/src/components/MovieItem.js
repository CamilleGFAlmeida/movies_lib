import React from 'react';

const MovieItem = ({ movie, setEditingMovie, deleteMovie }) => {
  return (
    <li>
      <h3>{movie.title}</h3>
      <p>Diretor: {movie.director || 'Desconhecido'}</p>
      <p>Ano: {movie.year || 'Desconhecido'}</p>
      <button onClick={() => setEditingMovie(movie)}>Editar</button>
      <button onClick={() => deleteMovie(movie.id)}>Deletar</button>
    </li>
  );
};

export default MovieItem;
