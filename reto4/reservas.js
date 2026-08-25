// reto4/reservas.js

// Mesas disponibles en el restaurante (constante)
const MESAS_DISPONIBLES = 10;

/**
 * Verifica si hay mesas disponibles para la reserva.
 * @param {number} mesasSolicitadas - Número de mesas que quiere reservar el cliente.
 * @returns {Promise<string>} Promesa que se resuelve si hay disponibilidad.
 */
function verificarDisponibilidad(mesasSolicitadas) {
    return new Promise((resolve, reject) => {
        // Simulamos un pequeño tiempo de procesamiento
        setTimeout(() => {
            if (mesasSolicitadas <= MESAS_DISPONIBLES) {
                resolve(` Hay ${mesasSolicitadas} mesa(s) disponible(s).`);
            } else {
                reject(` Lo sentimos, solo hay ${MESAS_DISPONIBLES} mesas disponibles.`);
            }
        }, 1000);
    });
}

/**
 * Simula el envío de un correo de confirmación.
 * @param {string} nombreCliente - Nombre del cliente.
 * @returns {Promise<string>} Promesa que se resuelve si el correo se envía, o se rechaza si falla.
 */
function enviarConfirmacionReserva(nombreCliente) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Math.random() para simular éxito o fracaso (80% de éxito)
            const exito = Math.random() > 0.2;
            if (exito) {
                resolve(` Correo de confirmación enviado a ${nombreCliente}.`);
            } else {
                reject(` No se pudo enviar el correo de confirmación a ${nombreCliente}.`);
            }
        }, 1500);
    });
}

/**
 * Función principal que gestiona el flujo de reserva usando async/await.
 * @param {string} nombreCliente - Nombre del cliente.
 * @param {number} mesasSolicitadas - Número de mesas a reservar.
 */
async function hacerReserva(nombreCliente, mesasSolicitadas) {
    console.log(`\n Procesando reserva para ${nombreCliente} (${mesasSolicitadas} mesas)...`);

    try {
        // 1. Verificar disponibilidad de mesas
        const mensajeDisponibilidad = await verificarDisponibilidad(mesasSolicitadas);
        console.log(mensajeDisponibilidad);

        // 2. Si hay disponibilidad, enviar confirmación
        const mensajeCorreo = await enviarConfirmacionReserva(nombreCliente);
        console.log(mensajeCorreo);

        console.log(` Reserva completada para ${nombreCliente}.`);
    } catch (error) {
        // 3. Manejo de errores: si no hay mesas o falla el correo
        console.error(` Error en la reserva: ${error}`);
    }
}

// ----- Pruebas del sistema -----

// Caso 1: Reserva exitosa (menos mesas que las disponibles)
hacerReserva('Carlos', 4);

// Caso 2: Reserva con demasiadas mesas (más de 10)
hacerReserva('Lucía', 12);

// Caso 3: Reserva exitosa (justo el número disponible)
hacerReserva('Ana', 10);

// Caso 4: Otra reserva exitosa (para ver variabilidad del correo)
hacerReserva('Pedro', 2);