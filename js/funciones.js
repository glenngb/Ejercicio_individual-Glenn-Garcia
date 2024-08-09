// Función constructora para Trabajador
function Trabajador(nombre, rut, cargo) {
    this.nombre = nombre;
    this.rut = rut;
    this.cargo = cargo;
}

// Función constructora para Proyecto
function Proyecto(nombreProyecto) {
    this.nombreProyecto = nombreProyecto;
    this.trabajadores = [];
}