import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieForm from './components/MovieForm';
import MovieList from './components/MovieList';
import './App.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [editingMovie, setEditingMovie] = useState(null);
  const apiKey = '411bd8e34b3dc946797dcabfa78abe77'; // Substituir pela chave API

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovieDetails = async (movieId) => {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=pt-BR&append_to_response=credits`);
    return response.data;
  };

  const fetchMovies = async () => {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR`);
    const moviesWithDetails = await Promise.all(response.data.results.map(async (movie) => {
      const details = await fetchMovieDetails(movie.id);
      return {
        ...movie,
        year: details.release_date.split('-')[0], // Extrai o ano
        director: details.credits.crew.find(crewMember => crewMember.job === 'Director')?.name || 'Desconhecido' // Busca o diretor
      };
    }));
    setMovies(moviesWithDetails);
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
      <h1>CineFilmes</h1>
      <MovieForm addMovie={addMovie} updateMovie={updateMovie} editingMovie={editingMovie} setEditingMovie={setEditingMovie} />
      <MovieList movies={movies} setEditingMovie={setEditingMovie} deleteMovie={deleteMovie} />
    </div>
  );
};

export default App;
