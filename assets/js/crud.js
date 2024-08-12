function actualizarTabla(proyectos, dataTable, resultadosTbody) {
    dataTable.destroy();

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
    actualizarTabla(proyectos, window.dataTable, resultadosTbody);
}
