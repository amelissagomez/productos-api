package com.evaluacion.productosapi.service.exception;

public class CategoriaNoEncontradoException extends RuntimeException {
    public CategoriaNoEncontradoException(String valorInvalido, String valoresValidos) {
        super(String.format(
                "Valor '%s' no es válido para la categoría. Las categorías válidas son: %s",
                valorInvalido,
                valoresValidos
        ));
    }
}
