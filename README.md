# Gestión de Proyectos - README

Este proyecto es una aplicación web sencilla para gestionar proyectos y trabajadores asociados. Permite agregar, editar y eliminar trabajadores dentro de proyectos y muestra los datos en una tabla interactiva utilizando DataTables.

## Funcionalidades Principales

### 1. **Agregar Proyecto y Trabajadores**
   - El formulario permite ingresar un proyecto y trabajadores asociados.
   - El botón `Agregar` se habilita solo cuando todos los campos están completos.
   - Al hacer clic en `Agregar`, el proyecto y sus trabajadores se añaden a la tabla.

### 2. **Editar Trabajadores**
   - Cada fila en la tabla tiene un botón de edición.
   - Al hacer clic en `Editar`, los datos se cargan en el formulario para ser modificados.
   - El botón `Editar` reemplaza al de `Agregar` mientras se edita un trabajador.

### 3. **Eliminar Trabajadores**
   - Cada fila en la tabla tiene un botón de eliminación.
   - Al hacer clic en `Eliminar`, se remueve el trabajador del proyecto.
   - Si un proyecto se queda sin trabajadores, el proyecto también se elimina.

### 4. **DataTable Interactivo**
   - La tabla es interactiva gracias a DataTables, con paginación, búsqueda y ordenamiento.


