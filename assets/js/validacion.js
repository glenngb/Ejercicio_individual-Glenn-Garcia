function verificarCampos(inputs, btnAgregar) {
    const todosLlenos = Array.from(inputs).every(input => input.value.trim() !== '');
    btnAgregar.disabled = !todosLlenos;
}
