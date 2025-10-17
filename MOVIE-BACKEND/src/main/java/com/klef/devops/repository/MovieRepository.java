package com.klef.devops.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.klef.devops.model.Movie;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
}