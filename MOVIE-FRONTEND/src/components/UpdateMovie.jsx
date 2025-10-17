import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { config } from './config';
import '../styles/MovieForm.css';

const UpdateMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState({
    title: '',
    director: '',
    genre: '',
    rating: '',
    releaseYear: ''
  });

  useEffect(() => {
    fetchMovie();
  }, []);

  const fetchMovie = async () => {
    try {
      const response = await axios.get(`${config.url}/get/${id}`);
      setMovie(response.data);
    } catch (error) {
      console.error('Error fetching movie:', error);
      alert('Movie not found');
      navigate('/movies');
    }
  };

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
      await axios.put(`${config.url}/update`, {
        ...movie,
        rating: parseFloat(movie.rating),
        releaseYear: parseInt(movie.releaseYear)
      });
      alert('Movie updated successfully!');
      navigate('/movies');
    } catch (error) {
      console.error('Error updating movie:', error);
      alert('Failed to update movie');
    }
  };

  return (
    <div className="movie-form">
      <h2>Update Movie</h2>
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
        <div className="form-buttons">
          <button type="submit" className="primary-btn">Update Movie</button>
          <button type="button" className="secondary-btn" onClick={() => navigate('/movies')}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateMovie;