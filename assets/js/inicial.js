const btnAgregar = document.getElementById('btn-agregar');
const btnEditar = document.getElementById('btn-editar');
const proyectoForm = document.getElementById('formulario-proyecto');
const resultadosTbody = document.getElementById('resultados');

let proyectos = [];
let index
ProyectoEdit = null;
let indexTrabajadorEdit = null;

$(document).ready(function () {
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
}); 