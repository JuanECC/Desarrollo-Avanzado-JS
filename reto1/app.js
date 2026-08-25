// app.js

const orderList = document.getElementById('orderList');
const addOrderBtn = document.getElementById('addOrderBtn');

let orderId = 1; // Para identificar los pedidos

addOrderBtn.addEventListener('click', () => {
    const order = { id: orderId++, status: 'En Proceso' };
    addOrder(order);
    processOrder(order);
});

// Agrega el pedido a la lista visual
function addOrder(order) {
    const listItem = document.createElement('li');
    listItem.id = `order-${order.id}`;
    listItem.textContent = `Pedido #${order.id}: ${order.status}`;
    orderList.appendChild(listItem);
}

// Actualiza el estado visual del pedido
function updateOrderStatus(order, status) {
    const listItem = document.getElementById(`order-${order.id}`);
    if (listItem) {
        listItem.textContent = `Pedido #${order.id}: ${status}`;
    }
}

// Procesa el pedido de manera asíncrona
async function processOrder(order) {
    // Simular tiempo de preparación aleatorio entre 1 y 4 segundos
    const preparationTime = Math.floor(Math.random() * 3000) + 1000;

    // Crear una Promise que se resuelve después del tiempo de preparación
    await new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, preparationTime);
    });

    // Actualizar el estado a "Completado"
    updateOrderStatus(order, 'Completado');
}