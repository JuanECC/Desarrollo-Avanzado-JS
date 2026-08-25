// app.js

document.getElementById('registroEvento').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío automático del formulario

    // Variables
    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const intereses = document.querySelectorAll('input[name="intereses"]:checked');
    const horario = document.querySelector('input[name="horario"]:checked');
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const archivo = document.getElementById('archivo').files[0]; // opcional

    // Validaciones básicas
    if (!nombre || !correo || !telefono || intereses.length === 0 || !horario) {
        alert('Por favor, completa todos los campos obligatorios.');
        return;
    }

    // Validación adicional 1: El nombre debe tener al menos 3 caracteres y no contener números
    if (nombre.length < 3 || /\d/.test(nombre)) {
        alert('El nombre debe tener al menos 3 caracteres y no contener números.');
        return;
    }

    // Validación adicional 2: El teléfono debe tener exactamente 10 dígitos
    const telefonoLimpio = telefono.replace(/\D/g, ''); // elimina cualquier carácter no numérico
    if (telefonoLimpio.length !== 10) {
        alert('El teléfono debe tener 10 dígitos (solo números).');
        return;
    }

    // Validación adicional 3: La fecha no debe ser en el pasado
    const fechaSeleccionada = new Date(fecha);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0); // para comparar solo la fecha, sin hora
    if (fechaSeleccionada < hoy) {
        alert('La fecha del evento no puede ser en el pasado.');
        return;
    }

    // Validación adicional 4: La hora debe estar entre 08:00 y 20:00
    const [horas, minutos] = hora.split(':').map(Number);
    if (horas < 8 || horas > 20 || (horas === 20 && minutos > 0)) {
        alert('La hora preferida debe estar entre las 08:00 y las 20:00.');
        return;
    }

    // Validación adicional 5: Si se sube archivo, debe pesar menos de 2 MB
    if (archivo && archivo.size > 2 * 1024 * 1024) {
        alert('El archivo no debe superar los 2 MB.');
        return;
    }

    // Si todo está bien
    alert('Registro exitoso. ¡Gracias por registrarte!');
});