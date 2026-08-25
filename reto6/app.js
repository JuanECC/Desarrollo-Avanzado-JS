// app.js

import { z } from 'https://esm.sh/zod@3.24.1';

// Esquema de validación con Zod
const registroSchema = z.object({
  nombre: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres.')
    .max(50, 'El nombre no debe exceder los 50 caracteres.'),
  correo: z
    .string()
    .email('Ingresa un correo electrónico válido.'),
  contrasena: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres.')
    .regex(/[A-Z]/, 'Debe contener al menos una letra mayúscula.')
    .regex(/[0-9]/, 'Debe contener al menos un número.')
});

// Elementos del DOM
const form = document.getElementById('registroForm');
const nombreInput = document.getElementById('nombre');
const correoInput = document.getElementById('correo');
const contrasenaInput = document.getElementById('contrasena');
const mensajeExito = document.getElementById('mensaje-exito');

// Limpiar mensajes de error
function limpiarErrores() {
  document.querySelectorAll('.error').forEach(el => el.textContent = '');
  mensajeExito.textContent = '';
}

// Mostrar errores por campo
function mostrarErrores(errores) {
  errores.forEach(error => {
    const campo = error.path[0]; // nombre del campo
    const mensaje = error.message;
    const errorElement = document.getElementById(`error-${campo}`);
    if (errorElement) {
      errorElement.textContent = mensaje;
    }
  });
}

// Manejar envío del formulario
form.addEventListener('submit', (event) => {
  event.preventDefault();
  limpiarErrores();

  const datos = {
    nombre: nombreInput.value.trim(),
    correo: correoInput.value.trim(),
    contrasena: contrasenaInput.value
  };

  const resultado = registroSchema.safeParse(datos);

  if (resultado.success) {
    mensajeExito.textContent = '✅ Registro exitoso. ¡Bienvenido!';
    form.reset();
  } else {
    const errores = resultado.error.issues.map(issue => ({
      path: issue.path,
      message: issue.message
    }));
    mostrarErrores(errores);
  }
});