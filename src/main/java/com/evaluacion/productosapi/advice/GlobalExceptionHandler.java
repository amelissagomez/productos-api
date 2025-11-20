package com.evaluacion.productosapi.advice;

import com.evaluacion.productosapi.entity.CategoriaProducto;
import com.evaluacion.productosapi.service.exception.CategoriaNoEncontradoException;
import com.evaluacion.productosapi.service.exception.ProductoNoEncontradoException;
import com.evaluacion.productosapi.service.exception.StockInsuficienteException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.NoHandlerFoundException;

import java.util.Arrays;
import java.util.stream.Collectors;

@ControllerAdvice
public class GlobalExceptionHandler {

    // --- ERROR 404 (URL no válida) ---
    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleNoHandlerFound(NoHandlerFoundException ex) {
        HttpStatus status = HttpStatus.NOT_FOUND;

        ApiErrorResponse response = new ApiErrorResponse(
                "Error en la solicitud",
                "URL no válida",
                status
        );

        return new ResponseEntity<>(response, status);
    }
    // --- MANEJAR 404 PRODUCTO (Producto no encontrado)---
    @ExceptionHandler(ProductoNoEncontradoException.class)
    public ResponseEntity<ApiErrorResponse> handleNotFound(ProductoNoEncontradoException ex) {
        HttpStatus status = HttpStatus.NOT_FOUND;

        ApiErrorResponse response = new ApiErrorResponse(
                "Producto no encontrado",
                ex.getMessage(),
                status
        );
        return new ResponseEntity<>(response, status); // 404
    }

    // --- MANEJAR 400 BAD REQUEST (Stock insuficiente/Argumentos Inválidos) ---
    @ExceptionHandler({
            StockInsuficienteException.class,
            IllegalArgumentException.class,
    })
    public ResponseEntity<ApiErrorResponse> handleBadRequest(RuntimeException ex) {
        HttpStatus status = HttpStatus.BAD_REQUEST;

        // Define el título del error basado en la
        String errorTitle = "Petición Inválida";
        if (ex instanceof StockInsuficienteException) {
            errorTitle = "Stock Insuficiente";
        }

        ApiErrorResponse response = new ApiErrorResponse(
                errorTitle,
                ex.getMessage(),
                status
        );
        return new ResponseEntity<>(response, status); // 400
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ApiErrorResponse> handleConversionMismatch(MethodArgumentTypeMismatchException ex){
        HttpStatus status = HttpStatus.BAD_REQUEST;
        String errorTitle;
        String descripcion;

        if(ex.getName().equals("categoria") && ex.getRequiredType() != null && ex.getRequiredType().isEnum()){
            String valoresValidos = Arrays.stream(CategoriaProducto.values())
                    .map(Enum::toString)
                    .collect(Collectors.joining(", "));

            errorTitle = "Categoría Inválida";
            descripcion = String.format("Valor '%s' no es válido para la categoría. Las categorías válidas son: %s",
                    ex.getValue(), valoresValidos);
        }else {
            errorTitle = "Fallo de Conversión de Tipo";
            descripcion = String.format("El valor '%s' no es válido para el parámetro '%s' (tipo esperado: %s).",
                    ex.getValue(), ex.getName(), ex.getRequiredType() != null ? ex.getRequiredType().getSimpleName() : "desconocido");
        }

        ApiErrorResponse response = new ApiErrorResponse(
                errorTitle,
                descripcion,
                status
        );

        return new ResponseEntity<>(response, status);
    }


}