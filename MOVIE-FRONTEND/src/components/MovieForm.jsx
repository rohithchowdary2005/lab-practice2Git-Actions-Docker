import { useState } from 'react';
import axios from 'axios';
import { config } from './config';
import '../styles/MovieForm.css';

const MovieForm = () => {
  const [movie, setMovie] = useState({
    title: '',
    director: '',
    genre: '',
    rating: '',
    releaseYear: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${config.url}/add`, {
        ...movie,
        rating: parseFloat(movie.rating),
        releaseYear: parseInt(movie.releaseYear)
      });
      alert('Movie added successfully!');
      setMovie({
        title: '',
        director: '',
        genre: '',
        rating: '',
        releaseYear: ''
      });
    } catch (error) {
      console.error('Error adding movie:', error);
      alert('Failed to add movie');
    }
  };

  return (
    <div className="movie-form">
      <h2>Add New Movie</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Movie Title</label>
          <input
            type="text"
            name="title"
            value={movie.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Director</label>
          <input
            type="text"
            name="director"
            value={movie.director}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Genre</label>
          <input
            type="text"
            name="genre"
            value={movie.genre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Rating</label>
          <input
            type="number"
            name="rating"
            value={movie.rating}
            onChange={handleChange}
            min="0"
            max="10"
            step="0.1"
            required
          />
        </div>
        <div className="form-group">
          <label>Release Year</label>
          <input
            type="number"
            name="releaseYear"
            value={movie.releaseYear}
            onChange={handleChange}
            min="1900"
            max="2025"
            required
          />
        </div>
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
};

export default MovieForm;