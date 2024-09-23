import React, { useState, useEffect } from 'react';

const MovieForm = ({ addMovie, updateMovie, editingMovie, setEditingMovie }) => {
  const [movie, setMovie] = useState({ title: '', director: '', year: '' });

  useEffect(() => {
    if (editingMovie) {
      setMovie(editingMovie);
    } else {
      setMovie({ title: '', director: '', year: '' });
    }
  }, [editingMovie]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingMovie) {
      updateMovie(movie);
    } else {
      addMovie(movie);
    }
    setEditingMovie(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título"
        value={movie.title}
        onChange={(e) => setMovie({ ...movie, title: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Diretor"
        value={movie.director}
        onChange={(e) => setMovie({ ...movie, director: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Ano"
        value={movie.year}
        onChange={(e) => setMovie({ ...movie, year: e.target.value })}
        required
      />
      <button type="submit">{editingMovie ? 'Atualizar' : 'Adicionar'}</button>
      {editingMovie && <button onClick={() => setEditingMovie(null)}>Cancelar</button>}
    </form>
  );
};

export default MovieForm;
