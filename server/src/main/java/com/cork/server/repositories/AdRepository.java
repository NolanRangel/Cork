package com.cork.server.repositories;

import java.util.List;

import com.cork.server.models.Ad;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdRepository extends CrudRepository<Ad, Long> {

    List<Ad> findAll();
    List<Ad> findByCategory(String category);

}
