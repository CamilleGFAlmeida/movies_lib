import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieForm from './components/MovieForm';
import MovieList from './components/MovieList';
import './App.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [editingMovie, setEditingMovie] = useState(null);
  const apiKey = 'SUA_CHAVE_API'; // Substitua pela sua chave API

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR`);
    setMovies(response.data.results);
  };

  const addMovie = (movie) => {
    setMovies([...movies, movie]);
  };

  const updateMovie = (movie) => {
    setMovies(movies.map(m => (m.id === movie.id ? movie : m)));
    setEditingMovie(null);
  };

  const deleteMovie = (id) => {
    setMovies(movies.filter(movie => movie.id !== id));
  };

  return (
    <div>
      <h1>CRUD de Filmes</h1>
      <MovieForm addMovie={addMovie} updateMovie={updateMovie} editingMovie={editingMovie} setEditingMovie={setEditingMovie} />
      <MovieList movies={movies} setEditingMovie={setEditingMovie} deleteMovie={deleteMovie} />
    </div>
  );
};

export default App;
