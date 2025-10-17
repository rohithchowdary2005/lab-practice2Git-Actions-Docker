import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>MovieVerse</h2>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-link">
          <i className="fas fa-home"></i>
          Home
        </Link>
        <Link to="/movies" className="nav-link">
          <i className="fas fa-film"></i>
          Movies
        </Link>
        <Link to="/add-movie" className="nav-link">
          <i className="fas fa-plus-circle"></i>
          Add Movie
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;