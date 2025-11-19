package com.evaluacion.productosapi.service.exception;

public class CategoriaInvalidaException extends RuntimeException {
    
    public CategoriaInvalidaException(String categoria) {
        super("La categoría '" + categoria + "' no es válida. Categorías permitidas: Tecnología, Accesorios, Oficina");
    }
}