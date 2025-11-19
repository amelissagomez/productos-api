package com.evaluacion.productosapi.service.exception;

public class ProductoNoEncontradoException extends RuntimeException {

    public ProductoNoEncontradoException(Long id) {
        super("El Producto con id " + id + " no existe");
    }
    
}
