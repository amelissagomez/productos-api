package com.evaluacion.productosapi.advice;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import java.time.LocalDateTime;

@Getter
public class ApiErrorResponse {

    private final String error;
    private final String descripcion;
    private final int status;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private final LocalDateTime timestamp;

    public ApiErrorResponse(String error, String descripcion, HttpStatus status) {
        this.error = error;
        this.descripcion = descripcion;
        this.timestamp = LocalDateTime.now();
        this.status = status.value();
    }

}