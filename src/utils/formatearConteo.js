const formatearConteo = (valor) => {
  // Si el valor es mayor o igual 1000, lo convierte a formato decimal añadiendo una "k". Ejemplo: 1500 --> 1.5k. Si no, lo devuelve como texto.
  return valor >= 1000 ? `${(valor / 1000).toFixed(1)}k` : valor.toString();
};

export default formatearConteo;
