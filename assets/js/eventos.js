document.addEventListener('DOMContentLoaded', function () {
    const inputs = document.querySelectorAll('#formulario-proyecto input');

    inputs.forEach(input => {
        input.addEventListener('input', function() {
            verificarCampos(inputs, btnAgregar);
        });
    });

    btnAgregar.addEventListener('click', function() {
        const nombreProyecto = document.getElementById('nombre_proyecto').value;
        const nombreTrabajador = document.getElementById('nombre_trabajador').value;
        const rutTrabajador = document.getElementById('rut_trabajador').value;
        const cargoTrabajador = document.getElementById('cargo_trabajador').value;

        let proyecto = proyectos.find(proyecto => proyecto.getNombreProyecto() === nombreProyecto);

        if (!proyecto) {
            proyecto = new Proyecto(nombreProyecto);
            proyectos.push(proyecto);
        }

        const nuevoTrabajador = new Trabajador(nombreTrabajador, rutTrabajador, cargoTrabajador);
        proyecto.agregarTrabajador(nuevoTrabajador);

        actualizarTabla(proyectos, window.dataTable, resultadosTbody);
        proyectoForm.reset();
        btnAgregar.disabled = true;  
    });

    btnEditar.addEventListener('click', function() {
        const nombreProyecto = document.getElementById('nombre_proyecto').value;
        const nombreTrabajador = document.getElementById('nombre_trabajador').value;
        const rutTrabajador = document.getElementById('rut_trabajador').value;
        const cargoTrabajador = document.getElementById('cargo_trabajador').value;

        const proyecto = proyectos[indexProyectoEdit];
        proyecto.editarTrabajador(indexTrabajadorEdit, nombreTrabajador, rutTrabajador, cargoTrabajador);

        actualizarTabla(proyectos, window.dataTable, resultadosTbody);
        proyectoForm.reset();
        btnAgregar.classList.remove('d-none');
        btnEditar.classList.add('d-none');
        btnAgregar.disabled = true;  
    });
});
