import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="hero-section">
        <h1>Welcome to MovieVerse</h1>
        <p>Your ultimate destination for managing your movie collection by-2300030327</p>
      </div>
      <div className="features">
        <div className="feature-card">
          <i className="fas fa-film"></i>
          <h3>Browse Movies</h3>
          <p>Explore our extensive collection of movies</p>
        </div>
        <div className="feature-card">
          <i className="fas fa-plus-circle"></i>
          <h3>Add Movies</h3>
          <p>Add your favorite movies to the collection</p>
        </div>
        <div className="feature-card">
          <i className="fas fa-star"></i>
          <h3>Rate Movies</h3>
          <p>Rate and keep track of your movie experiences</p>
        </div>
      </div>
    </div>
  );
};

export default Home;