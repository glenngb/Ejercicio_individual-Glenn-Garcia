const btnAgregar = document.getElementById('btn-agregar');
const btnEditar = document.getElementById('btn-editar');
const proyectoForm = document.getElementById('formulario-proyecto');
const resultadosTbody = document.getElementById('resultados');

let proyectos = [];
let indexProyectoEdit = null;
let indexTrabajadorEdit = null;

const inputs = document.querySelectorAll('#formulario-proyecto input');
inputs.forEach(input => {
    input.addEventListener('input', verificarCampos);
});

function verificarCampos() {
    const todosLlenos = Array.from(inputs).every(input => input.value.trim() !== '');
    btnAgregar.disabled = !todosLlenos;
}

btnAgregar.addEventListener('click', function() {
    // Obtener valores del formulario
    const nombreProyecto = document.getElementById('nombre_proyecto').value;
    const nombreTrabajador = document.getElementById('nombre_trabajador').value;
    const rutTrabajador = document.getElementById('rut_trabajador').value;
    const cargoTrabajador = document.getElementById('cargo_trabajador').value;

    // Buscar proyecto existente o crear uno nuevo
    let proyecto = proyectos.find(proyecto => proyecto.getNombreProyecto() === nombreProyecto);

    if (!proyecto) {
        proyecto = new Proyecto(nombreProyecto);
        proyectos.push(proyecto);
    }

    const nuevoTrabajador = new Trabajador(nombreTrabajador, rutTrabajador, cargoTrabajador);
    proyecto.agregarTrabajador(nuevoTrabajador);

    actualizarTabla();
    proyectoForm.reset();
    btnAgregar.disabled = true;  // Deshabilitar de nuevo
});

btnEditar.addEventListener('click', function() {
    const nombreProyecto = document.getElementById('nombre_proyecto').value;
    const nombreTrabajador = document.getElementById('nombre_trabajador').value;
    const rutTrabajador = document.getElementById('rut_trabajador').value;
    const cargoTrabajador = document.getElementById('cargo_trabajador').value;

    const proyecto = proyectos[indexProyectoEdit];
    proyecto.editarTrabajador(indexTrabajadorEdit, nombreTrabajador, rutTrabajador, cargoTrabajador);

    actualizarTabla();
    proyectoForm.reset();
    btnAgregar.classList.remove('d-none');
    btnEditar.classList.add('d-none');
    btnAgregar.disabled = true;  // Deshabilitar de nuevo
    
});

function actualizarTabla() {
    // Destruye el DataTable antes de manipular el DOM -Esto ayuda cada vez que se agregue nueva información en la tabla
    window.dataTable.destroy();

    resultadosTbody.innerHTML = '';
    proyectos.forEach((proyecto, indexProyecto) => {
        proyecto.mostrarDatosTrabajadores().forEach((dato, indexTrabajador) => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${proyecto.getNombreProyecto()}</td>
                <td>${dato.nombre}</td>
                <td>${dato.rut}</td>
                <td>${dato.cargo}</td>
                <td>
                    <button class="btn btn-warning btn-sm me-2" onclick="prepararEdicion(${indexProyecto}, ${indexTrabajador})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarTrabajador(${indexProyecto}, ${indexTrabajador})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            resultadosTbody.appendChild(fila);
        });
    });

    // Re-inicializa el DataTable después de manipular el DOM
    window.dataTable = $('#tabla-proyectos').DataTable({
        language: {
            url: "//cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json",
        },
        responsive: true,
        paging: true,
        pageLength: 5,
        lengthChange: false,
        order: [[1, 'asc']],
    });
}


function prepararEdicion(indexProyecto, indexTrabajador) {
    const proyecto = proyectos[indexProyecto];
    const trabajador = proyecto.trabajadores[indexTrabajador];

    document.getElementById('nombre_proyecto').value = proyecto.getNombreProyecto();
    document.getElementById('nombre_trabajador').value = trabajador.getNombre();
    document.getElementById('rut_trabajador').value = trabajador.getRut();
    document.getElementById('cargo_trabajador').value = trabajador.getCargo();

    indexProyectoEdit = indexProyecto;
    indexTrabajadorEdit = indexTrabajador;

    btnAgregar.classList.add('d-none');
    btnEditar.classList.remove('d-none');
}

function eliminarTrabajador(indexProyecto, indexTrabajador) {
    const proyecto = proyectos[indexProyecto];
    proyecto.trabajadores.splice(indexTrabajador, 1);
    if (proyecto.trabajadores.length === 0) {
        proyectos.splice(indexProyecto, 1);
    }
    actualizarTabla();
}

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
        const trabajador = this.trabajadores [indexTrabajador];
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