package com.evaluacion.productosapi.repository;

import com.evaluacion.productosapi.entity.Producto;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
    //Se crea el nuevo metodo para buscar por categoria
    List<Producto> findByCategoria(String categoria);
}
