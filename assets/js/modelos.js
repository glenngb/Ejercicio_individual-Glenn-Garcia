class Trabajador {
    constructor(nombre, rut, cargo) {
        this.nombre = nombre;
        this.rut = rut;
        this.cargo = cargo;
    }

    getNombre() {
        return this.nombre;
    }

    getRut() {
        return this.rut;
    }

    getCargo() {
        return this.cargo;
    }

    setNombre(nombre) {
        this.nombre = nombre;
    }

    setRut(rut) {
        this.rut = rut;
    }

    setCargo(cargo) {
        this.cargo = cargo;
    }
}

class Proyecto {
    constructor(nombre_proyecto) {
        this.nombre_proyecto = nombre_proyecto;
        this.trabajadores = [];
    }

    getNombreProyecto() {
        return this.nombre_proyecto;
    }

    setNombreProyecto(nombre_proyecto) {
        this.nombre_proyecto = nombre_proyecto;
    }

    agregarTrabajador(trabajador) {
        this.trabajadores.push(trabajador);
    }

    editarTrabajador(indexTrabajador, nuevoNombre, nuevoRut, nuevoCargo) {
        const trabajador = this.trabajadores[indexTrabajador];
        trabajador.setNombre(nuevoNombre);
        trabajador.setRut(nuevoRut);
        trabajador.setCargo(nuevoCargo);
    }

    mostrarDatosTrabajadores() {
        return this.trabajadores.map(trabajador => {
            return {
                nombre: trabajador.getNombre(),
                rut: trabajador.getRut(),
                cargo: trabajador.getCargo()
            };
        });
    }
}
