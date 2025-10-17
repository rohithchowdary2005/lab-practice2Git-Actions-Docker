package com.klef.devops.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.klef.devops.model.Movie;
import com.klef.devops.service.MovieService;

@RestController
@RequestMapping("/movieapi/")
@CrossOrigin(origins = "*")
public class MovieController {

    @Autowired
    private MovieService movieService;

    @GetMapping("/")
    public String home() {
        return "MovieVerse API Running";
    }
    
    @GetMapping("/hero")
    public String hero() {
    	return "J SuryaKiran";
    }

    @PostMapping("/add")
    public ResponseEntity<Movie> addMovie(@RequestBody Movie movie) {
        Movie savedMovie = movieService.addMovie(movie);
        return new ResponseEntity<>(savedMovie, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Movie>> getAllMovies() {
        List<Movie> movies = movieService.getAllMovies();
        return new ResponseEntity<>(movies, HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getMovieById(@PathVariable Long id) {
        Movie movie = movieService.getMovieById(id);
        if (movie != null) {
            return new ResponseEntity<>(movie, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Movie with ID " + id + " not found.", HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateMovie(@RequestBody Movie movie) {
        Movie existing = movieService.getMovieById(movie.getMovieId());
        if (existing != null) {
            Movie updatedMovie = movieService.updateMovie(movie);
            return new ResponseEntity<>(updatedMovie, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cannot update. Movie with ID " + movie.getMovieId() + " not found.", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteMovie(@PathVariable Long id) {
        Movie existing = movieService.getMovieById(id);
        if (existing != null) {
            movieService.deleteMovieById(id);
            return new ResponseEntity<>("Movie with ID " + id + " deleted successfully.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cannot delete. Movie with ID " + id + " not found.", HttpStatus.NOT_FOUND);
        }
    }
}