// index.js
const planetas = require('./planetas');
const cowsay = require('cowsay');

function mostrarPlanetas() {
  console.log('🚀 ¡Reporte de exploración espacial! 🚀\n');

  planetas.forEach((planeta, indice) => {
    console.log(`🔭 Planeta #${indice + 1}: ${planeta.nombre}`);
    console.log(`   Descripción: ${planeta.descripcion}`);
    console.log(`   Descubierto en: ${planeta.descubiertoEn}`);
    console.log('-----------------------------------');
  });

  console.log(cowsay.say({
    text: `¡Se han registrado ${planetas.length} planetas!`,
    e: "oO",
    T: "U "
  }));
}

mostrarPlanetas();