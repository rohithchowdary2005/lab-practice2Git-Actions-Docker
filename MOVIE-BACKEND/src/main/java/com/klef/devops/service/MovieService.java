package com.klef.devops.service;

import java.util.List;
import com.klef.devops.model.Movie;

public interface MovieService {

    Movie addMovie(Movie movie);

    List<Movie> getAllMovies();

    Movie getMovieById(Long id);

    Movie updateMovie(Movie movie);

    void deleteMovieById(Long id);
}
