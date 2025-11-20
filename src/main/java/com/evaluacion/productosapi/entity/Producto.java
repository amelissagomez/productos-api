package com.evaluacion.productosapi.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;

@Entity
@Table(name = "productos")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;

    @DecimalMin(value = "0.0", inclusive = false, message = "El precio debe ser mayor que 0")
    private BigDecimal precio;

    @Min(value = 0, message = "La cantidad disponible no puede ser negativa")
    private Integer cantidadDisponible;

    @Size(max= 255, message = "La descripción no debe exceder los 255 caracteres")
    private String descripcion;

    @NotNull(message = "La categoría es obligatoria")
    @Enumerated(EnumType.STRING)
    private CategoriaProducto categoria;

    public Producto() {
    }

    public Producto(String nombre, BigDecimal precio, Integer cantidadDisponible, String descripcion, CategoriaProducto categoria) {
        this.nombre = nombre;
        this.precio = precio;
        this.cantidadDisponible = cantidadDisponible;
        this.descripcion = descripcion;
        this.categoria = categoria;
    }

    // Getters y setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public BigDecimal getPrecio() {
        return precio;
    }

    public void setPrecio(BigDecimal precio) {
        this.precio = precio;
    }

    public Integer getCantidadDisponible() {
        return cantidadDisponible;
    }

    public void setCantidadDisponible(Integer cantidadDisponible) {
        this.cantidadDisponible = cantidadDisponible;
    }

    public String getDescripcion() {return descripcion;}

    public void setDescripcion(String descripcion){this.descripcion = descripcion;}

    public CategoriaProducto getCategoria() {return categoria;}

    public void setCategoria(CategoriaProducto categoria) {this.categoria = categoria;}
}
